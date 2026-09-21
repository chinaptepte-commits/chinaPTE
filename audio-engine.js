/**
 * chinaPTE · HTML5 audio engine (primary) + speechSynthesis fallback
 * Single HTMLAudioElement queue · Media Session · works with keepalive silent loop
 * Auto-retries play() when OS pauses the element (notification / screen-off) without
 * resolving the speak Promise as interrupted — so the same clip continues.
 */
(function (global) {
  "use strict";

  var manifest = null;
  var manifestPromise = null;
  var audioEl = null;
  var activeToken = 0;
  var playing = false;
  var intentionalStop = false;
  var queueResolve = null;
  var pauseRetryTimer = null;
  var pauseRetryCount = 0;
  var MAX_PAUSE_RETRIES = 6;
  var PAUSE_RETRY_MS = 280;
  var pauseWired = false;

  function clearPauseRetry() {
    if (pauseRetryTimer) {
      clearTimeout(pauseRetryTimer);
      pauseRetryTimer = null;
    }
  }

  function resetPauseRetries() {
    clearPauseRetry();
    pauseRetryCount = 0;
  }

  function hasUsableSrc(a) {
    if (!a) return false;
    var src = a.currentSrc || a.getAttribute("src") || a.src || "";
    return !!(src && src.length > 0);
  }

  function tryResumeElement(reason) {
    if (intentionalStop || !playing) return false;
    var a = audioEl;
    if (!a || !hasUsableSrc(a)) return false;
    if (a.ended) return false;
    if (!a.paused) return true;
    try {
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          /* will retry via pause handler / resumeIfNeeded / keepalive */
        });
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function onElementPause() {
    if (intentionalStop || !playing) return;
    if (!audioEl || !hasUsableSrc(audioEl)) return;
    if (audioEl.ended) return;
    if (pauseRetryCount >= MAX_PAUSE_RETRIES) return;
    clearPauseRetry();
    pauseRetryTimer = setTimeout(function () {
      pauseRetryTimer = null;
      if (intentionalStop || !playing) return;
      if (!audioEl || !audioEl.paused || audioEl.ended) return;
      if (!hasUsableSrc(audioEl)) return;
      pauseRetryCount += 1;
      tryResumeElement("pause-retry");
    }, PAUSE_RETRY_MS);
  }

  function onElementPlaying() {
    resetPauseRetries();
  }

  function ensureEl() {
    if (audioEl) return audioEl;
    audioEl = new Audio();
    audioEl.preload = "auto";
    audioEl.setAttribute("playsinline", "true");
    audioEl.setAttribute("webkit-playsinline", "true");
    if (!pauseWired) {
      pauseWired = true;
      audioEl.addEventListener("pause", onElementPause);
      audioEl.addEventListener("playing", onElementPlaying);
    }
    return audioEl;
  }

  function setMediaPlaying(on) {
    if (!("mediaSession" in navigator)) return;
    try { navigator.mediaSession.playbackState = on ? "playing" : "paused"; } catch (e) {}
  }

  function setMediaMeta(title) {
    if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || "chinaPTE 随身听",
        artist: "chinaPTE",
        album: "随身听"
      });
    } catch (e) {}
  }

  function loadManifest(baseUrl) {
    if (manifest) return Promise.resolve(manifest);
    if (manifestPromise) return manifestPromise;
    var url = (baseUrl || "audio/") + "manifest.json";
    manifestPromise = fetch(url, { cache: "force-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("manifest " + r.status);
        return r.json();
      })
      .then(function (data) {
        manifest = data || { clips: {}, base: "audio/" };
        return manifest;
      })
      .catch(function () {
        manifest = { clips: {}, base: "audio/", count: 0 };
        return manifest;
      });
    return manifestPromise;
  }

  function resolveClipUrl(clipKey) {
    if (!clipKey) return null;
    if (!manifest || !manifest.clips) return null;
    var rel = manifest.clips[clipKey];
    if (!rel) return null;
    var base = manifest.base || "audio/";
    if (rel.indexOf("http") === 0 || rel.indexOf("/") === 0 || rel.indexOf("data:") === 0) return rel;
    return base + rel;
  }

  function cancel() {
    intentionalStop = true;
    resetPauseRetries();
    activeToken += 1;
    playing = false;
    setMediaPlaying(false);
    if (queueResolve) {
      var qr = queueResolve;
      queueResolve = null;
      try { qr({ interrupted: true, via: "html-audio" }); } catch (e) {}
    }
    if (audioEl) {
      try {
        audioEl.onended = null;
        audioEl.onerror = null;
        audioEl.pause();
        audioEl.removeAttribute("src");
        audioEl.load();
      } catch (e) {}
    }
    if (window.speechSynthesis) {
      try { speechSynthesis.cancel(); } catch (e) {}
    }
  }

  function isPlaying() {
    return !!(playing && audioEl && !audioEl.paused && !audioEl.ended);
  }

  /**
   * If session still wants audio but the element was paused by the OS
   * (notification / lock screen), retry play without killing the Promise.
   */
  function resumeIfNeeded() {
    if (!playing || intentionalStop) return false;
    if (!audioEl) return false;
    if (!audioEl.paused || audioEl.ended) return false;
    if (!hasUsableSrc(audioEl)) return false;
    resetPauseRetries();
    return tryResumeElement("resumeIfNeeded");
  }

  function clampRate(r) {
    r = Number(r) || 1;
    if (r < 0.5) return 0.5;
    if (r > 2) return 2;
    return r;
  }

  function playUrl(url, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      cancel();
      var token = activeToken;
      var a = ensureEl();
      intentionalStop = false;
      playing = true;
      resetPauseRetries();
      if (opts.title) setMediaMeta(opts.title);
      setMediaPlaying(true);
      a.playbackRate = clampRate(opts.playbackRate != null ? opts.playbackRate : 1);
      a.src = url;
      a.onended = function () {
        if (token !== activeToken) { resolve({ interrupted: true, via: "html-audio" }); return; }
        playing = false;
        resetPauseRetries();
        setMediaPlaying(false);
        resolve({ via: "html-audio" });
      };
      a.onerror = function () {
        if (token !== activeToken) { resolve({ interrupted: true, via: "html-audio" }); return; }
        playing = false;
        resetPauseRetries();
        setMediaPlaying(false);
        resolve({ error: true, via: "html-audio" });
      };
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          if (token !== activeToken) { resolve({ interrupted: true, via: "html-audio" }); return; }
          // Transient autoplay / OS denial — leave Promise open and let pause-retry /
          // resumeIfNeeded / keepalive recover the same clip instead of interrupting.
          if (playing && !intentionalStop && hasUsableSrc(a)) {
            pauseRetryCount = 0;
            onElementPause();
            return;
          }
          playing = false;
          resetPauseRetries();
          setMediaPlaying(false);
          resolve({ error: true, via: "html-audio" });
        });
      }
    });
  }

  function playQueue(urls, opts) {
    opts = opts || {};
    urls = (urls || []).filter(Boolean);
    if (!urls.length) return Promise.resolve({ via: "html-audio", empty: true });
    cancel();
    var token = activeToken;
    var rate = clampRate(opts.playbackRate != null ? opts.playbackRate : 1);
    if (opts.title) setMediaMeta(opts.title);
    return new Promise(function (resolve) {
      queueResolve = resolve;
      var i = 0;
      function next() {
        if (token !== activeToken) {
          queueResolve = null;
          resolve({ interrupted: true, via: "html-audio" });
          return;
        }
        if (i >= urls.length) {
          playing = false;
          resetPauseRetries();
          setMediaPlaying(false);
          queueResolve = null;
          resolve({ via: "html-audio" });
          return;
        }
        var url = urls[i++];
        var a = ensureEl();
        intentionalStop = false;
        playing = true;
        resetPauseRetries();
        setMediaPlaying(true);
        a.playbackRate = rate;
        a.onended = function () { next(); };
        a.onerror = function () { next(); };
        a.src = url;
        var p = a.play();
        if (p && typeof p.catch === "function") {
          p.catch(function () {
            if (token !== activeToken) return;
            if (playing && !intentionalStop && hasUsableSrc(a)) {
              pauseRetryCount = 0;
              onElementPause();
              return;
            }
            next();
          });
        }
      }
      next();
    });
  }

  function speakViaTts(text, opts) {
    opts = opts || {};
    return new Promise(function (resolve, reject) {
      if (!window.speechSynthesis) { reject(new Error("no speechSynthesis")); return; }
      var u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || "en-US";
      u.rate = opts.rate != null ? opts.rate : 1;
      u.pitch = opts.pitch != null ? opts.pitch : 1;
      u.volume = 1;
      if (opts.voice) u.voice = opts.voice;
      u.onend = function () { resolve({ via: "speechSynthesis" }); };
      u.onerror = function (e) {
        if (e.error === "interrupted" || e.error === "canceled") resolve({ interrupted: true, via: "speechSynthesis" });
        else reject(e);
      };
      speechSynthesis.cancel();
      setTimeout(function () { speechSynthesis.speak(u); }, 40);
    });
  }

  function speak(text, opts) {
    opts = opts || {};
    var url = opts.audioUrl || resolveClipUrl(opts.clipKey);
    if (url) {
      return playUrl(url, {
        playbackRate: opts.rate != null ? opts.rate : 1,
        title: opts.title
      }).then(function (r) {
        if (r && r.error && text) return speakViaTts(text, opts);
        return r;
      });
    }
    return speakViaTts(text, opts);
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { loadManifest(); });
    } else {
      loadManifest();
    }
  }

  global.ChinaPTEAudio = {
    speak: speak,
    cancel: cancel,
    resolveClipUrl: resolveClipUrl,
    loadManifest: loadManifest,
    playQueue: playQueue,
    playUrl: playUrl,
    isPlaying: isPlaying,
    resumeIfNeeded: resumeIfNeeded,
    getManifest: function () { return manifest; }
  };
})(typeof window !== "undefined" ? window : globalThis);
