/**
 * chinaPTE · mobile keep-alive helpers
 * Silent looping HTMLAudio + Media Session + optional Screen Wake Lock.
 * Helps Android Chrome keep playback alive when the screen turns off.
 * Prefer HTML5 MP3 (ChinaPTEAudio); silent loop + Media Session still help between clips.
 *
 * Wake Lock (屏幕常亮) stays OFF by default — commute listening wants screen off + audio on.
 * Enable wake-lock only on TTS-fallback devices where speechSynthesis dies in background.
 * iOS Safari may still suspend speechSynthesis / aggressive background tabs within browser limits.
 */
(function (global) {
  "use strict";

  var STORAGE_KEEP = "chinaPTE_keepAlive";
  var STORAGE_WAKE = "chinaPTE_wakeLock";
  var HEARTBEAT_MS = 1500;
  var RESUME_COOLDOWN_MS = 1800;

  // ~1s silent mono 8kHz WAV (PCM zeros) — loops while 随身听 is active
  function buildSilentWavDataUri(seconds) {
    var sampleRate = 8000;
    var numSamples = Math.max(1, Math.floor(sampleRate * (seconds || 1)));
    var dataSize = numSamples * 2;
    var buffer = new ArrayBuffer(44 + dataSize);
    var view = new DataView(buffer);
    function writeStr(offset, str) {
      for (var i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    }
    writeStr(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, "data");
    view.setUint32(40, dataSize, true);
    // PCM silence already zero-filled
    var bytes = new Uint8Array(buffer);
    var bin = "";
    for (var j = 0; j < bytes.length; j++) bin += String.fromCharCode(bytes[j]);
    return "data:audio/wav;base64," + btoa(bin);
  }

  // Tiny known-good silent MP3 fallback (some Android prefer mpeg)
  var SILENT_MP3 =
    "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBTb3VuZCBzb25nLmpzb24AVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQM0AAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

  function loadBool(key, defaultVal) {
    try {
      var v = localStorage.getItem(key);
      if (v === null || v === undefined) return defaultVal;
      return v === "1" || v === "true";
    } catch (e) {
      return defaultVal;
    }
  }
  function saveBool(key, val) {
    try {
      localStorage.setItem(key, val ? "1" : "0");
    } catch (e) {}
  }

  /**
   * @param {object} hooks
   * @param {function():boolean} hooks.isPlaying
   * @param {function()} hooks.onPlay
   * @param {function()} hooks.onPause
   * @param {function()} hooks.onNext
   * @param {function()} hooks.onPrev
   * @param {function()} [hooks.onResumeSpeech] - called when session wants play but audio is dead
   * @param {string} [hooks.artist]
   */
  function create(hooks) {
    hooks = hooks || {};
    var artist = hooks.artist || "chinaPTE 随身听";
    var keepAliveOn = loadBool(STORAGE_KEEP, true);
    var wakeLockOn = loadBool(STORAGE_WAKE, false);
    var silentAudio = null;
    var wakeLock = null;
    var startedOnce = false;
    var wantSilent = false;
    var lastTitle = "";
    var visibilityBound = false;
    var lastResumeCall = 0;

    function ensureSilentEl() {
      if (silentAudio) return silentAudio;
      silentAudio = new Audio();
      silentAudio.loop = true;
      silentAudio.volume = 0.01;
      silentAudio.preload = "auto";
      try {
        silentAudio.src = buildSilentWavDataUri(1.2);
      } catch (e) {
        silentAudio.src = SILENT_MP3;
      }
      silentAudio.setAttribute("playsinline", "true");
      silentAudio.setAttribute("webkit-playsinline", "true");
      // Keep session alive if the element ends unexpectedly
      silentAudio.addEventListener("pause", function () {
        if (wantSilent && keepAliveOn && !silentAudio._chinaPteStopping) {
          tryPlaySilent();
        }
      });
      silentAudio.addEventListener("ended", function () {
        if (wantSilent && keepAliveOn) tryPlaySilent();
      });
      return silentAudio;
    }

    function tryPlaySilent() {
      if (!keepAliveOn || !wantSilent) return;
      var el = ensureSilentEl();
      el._chinaPteStopping = false;
      var p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          // Autoplay blocked until next user gesture — ignored
        });
      }
    }

    function stopSilent() {
      wantSilent = false;
      if (!silentAudio) return;
      silentAudio._chinaPteStopping = true;
      try {
        silentAudio.pause();
        silentAudio.currentTime = 0;
      } catch (e) {}
    }

    function releaseWakeLock() {
      if (wakeLock) {
        try {
          wakeLock.release();
        } catch (e) {}
        wakeLock = null;
      }
    }

    async function requestWakeLock() {
      if (!wakeLockOn) {
        releaseWakeLock();
        return;
      }
      if (!("wakeLock" in navigator) || !navigator.wakeLock) return;
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        if (wakeLock && wakeLock.addEventListener) {
          wakeLock.addEventListener("release", function () {
            wakeLock = null;
          });
        }
      } catch (e) {
        // Permission / unsupported / battery saver
        wakeLock = null;
      }
    }

    function setMediaSessionPlaying(playing) {
      if (!("mediaSession" in navigator)) return;
      try {
        navigator.mediaSession.playbackState = playing ? "playing" : "paused";
      } catch (e) {}
    }

    function updateMetadata(title) {
      lastTitle = title || lastTitle || "随身听";
      if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: lastTitle,
          artist: artist,
          album: "chinaPTE",
        });
      } catch (e) {}
    }

    function wireMediaSession() {
      if (!("mediaSession" in navigator)) return;
      var map = {
        play: hooks.onPlay,
        pause: hooks.onPause,
        nexttrack: hooks.onNext,
        previoustrack: hooks.onPrev,
      };
      Object.keys(map).forEach(function (action) {
        try {
          if (typeof map[action] === "function") {
            navigator.mediaSession.setActionHandler(action, function () {
              map[action]();
            });
          }
        } catch (e) {
          // Some browsers reject unsupported actions
        }
      });
    }

    function htmlAudioActuallyPlaying() {
      return !!(
        window.ChinaPTEAudio &&
        typeof window.ChinaPTEAudio.isPlaying === "function" &&
        window.ChinaPTEAudio.isPlaying()
      );
    }

    function tryHtmlResume() {
      if (
        window.ChinaPTEAudio &&
        typeof window.ChinaPTEAudio.resumeIfNeeded === "function"
      ) {
        try {
          return !!window.ChinaPTEAudio.resumeIfNeeded();
        } catch (e) {
          return false;
        }
      }
      return false;
    }

    function speechAlive() {
      if (!window.speechSynthesis) return false;
      try {
        if (speechSynthesis.paused) {
          try { speechSynthesis.resume(); } catch (e) {}
          return true;
        }
        return !!(speechSynthesis.speaking || speechSynthesis.pending);
      } catch (e) {
        return false;
      }
    }

    /** Session wants play but neither HTML audio nor TTS is producing sound. */
    function maybeResumeDeadPlayback(force) {
      if (typeof hooks.isPlaying !== "function" || !hooks.isPlaying()) return;
      // Inter-clip waits (zh↔en gaps) look "dead" — never restart the whole sequence there
      if (typeof hooks.isBetweenClips === "function" && hooks.isBetweenClips()) return;
      if (htmlAudioActuallyPlaying()) return;
      // Prefer nudging the same HTML clip before restarting the whole sequence
      if (tryHtmlResume()) return;
      if (speechAlive()) return;
      if (typeof hooks.onResumeSpeech !== "function") return;
      var now = Date.now();
      if (!force && now - lastResumeCall < RESUME_COOLDOWN_MS) return;
      lastResumeCall = now;
      try {
        hooks.onResumeSpeech();
      } catch (e) {}
    }

    function nudgeSession(opts) {
      opts = opts || {};
      if (wantSilent && keepAliveOn) tryPlaySilent();
      if (window.speechSynthesis) {
        try {
          if (speechSynthesis.paused) speechSynthesis.resume();
        } catch (e) {}
      }
      tryHtmlResume();
      maybeResumeDeadPlayback(!!opts.forceResume);
    }

    function onVisibility() {
      var hidden = document.hidden || document.visibilityState === "hidden";
      if (hidden) {
        nudgeSession({ forceResume: false });
      } else {
        if (wakeLockOn && wantSilent) requestWakeLock();
        nudgeSession({ forceResume: true });
      }
    }

    function bindVisibility() {
      if (visibilityBound) return;
      visibilityBound = true;
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pagehide", function () {
        if (wantSilent && keepAliveOn) tryPlaySilent();
        tryHtmlResume();
      });
      window.addEventListener("pageshow", function () {
        nudgeSession({ forceResume: true });
        if (wakeLockOn && wantSilent) requestWakeLock();
      });
      window.addEventListener("focus", function () {
        nudgeSession({ forceResume: true });
      });
      window.addEventListener("online", function () {
        nudgeSession({ forceResume: true });
      });
      document.addEventListener("freeze", function () {
        if (wantSilent && keepAliveOn) tryPlaySilent();
        tryHtmlResume();
      });
    }

    /** Call on first Play / Play All user gesture while session active */
    function onSessionStart(title) {
      startedOnce = true;
      wantSilent = true;
      bindVisibility();
      wireMediaSession();
      if (title) updateMetadata(title);
      if (keepAliveOn) tryPlaySilent();
      if (wakeLockOn) requestWakeLock();
      setMediaSessionPlaying(true);
    }

    function onSessionStop() {
      wantSilent = false;
      stopSilent();
      releaseWakeLock();
      setMediaSessionPlaying(false);
    }

    function onSessionPause() {
      // Keep silent audio if keep-alive is on (helps Android), but mark paused
      setMediaSessionPlaying(false);
      releaseWakeLock();
      // Still keep silent looping if user left keep-alive on and may resume soon —
      // stop silent only when fully stopped; on pause release wake lock only.
    }

    function setKeepAlive(on) {
      keepAliveOn = !!on;
      saveBool(STORAGE_KEEP, keepAliveOn);
      if (keepAliveOn && wantSilent) tryPlaySilent();
      else if (!keepAliveOn) stopSilent();
      syncToggleUI();
    }

    function setWakeLock(on) {
      wakeLockOn = !!on;
      saveBool(STORAGE_WAKE, wakeLockOn);
      if (wakeLockOn && wantSilent) requestWakeLock();
      else releaseWakeLock();
      syncToggleUI();
    }

    function syncToggleUI() {
      var ka = document.getElementById("btnKeepAlive");
      var wl = document.getElementById("btnWakeLock");
      if (ka) {
        ka.classList.toggle("is-on", keepAliveOn);
        ka.setAttribute("aria-pressed", keepAliveOn ? "true" : "false");
      }
      if (wl) {
        wl.classList.toggle("is-on", wakeLockOn);
        wl.setAttribute("aria-pressed", wakeLockOn ? "true" : "false");
      }
    }

    function bindToggles() {
      syncToggleUI();
      var ka = document.getElementById("btnKeepAlive");
      var wl = document.getElementById("btnWakeLock");
      if (ka && !ka._chinaPteBound) {
        ka._chinaPteBound = true;
        ka.addEventListener("click", function () {
          setKeepAlive(!keepAliveOn);
        });
      }
      if (wl && !wl._chinaPteBound) {
        wl._chinaPteBound = true;
        wl.addEventListener("click", function () {
          setWakeLock(!wakeLockOn);
        });
      }
    }

    // Heartbeat: nudge silent audio + recover dead HTML/TTS while session active
    setInterval(function () {
      if (!wantSilent) return;
      if (keepAliveOn) {
        var el = silentAudio;
        if (el && el.paused) tryPlaySilent();
      }
      if (typeof hooks.isPlaying !== "function" || !hooks.isPlaying()) return;
      if (window.speechSynthesis && speechSynthesis.speaking && speechSynthesis.paused) {
        try { speechSynthesis.resume(); } catch (e) {}
      }
      tryHtmlResume();
      maybeResumeDeadPlayback(false);
    }, HEARTBEAT_MS);

    return {
      onSessionStart: onSessionStart,
      onSessionStop: onSessionStop,
      onSessionPause: onSessionPause,
      updateMetadata: updateMetadata,
      setKeepAlive: setKeepAlive,
      setWakeLock: setWakeLock,
      bindToggles: bindToggles,
      syncToggleUI: syncToggleUI,
      isKeepAliveOn: function () {
        return keepAliveOn;
      },
      isWakeLockOn: function () {
        return wakeLockOn;
      },
      nudgeSilent: tryPlaySilent,
    };
  }

  global.ChinaPTEKeepAlive = { create: create, STORAGE_KEEP: STORAGE_KEEP, STORAGE_WAKE: STORAGE_WAKE };
})(typeof window !== "undefined" ? window : globalThis);
