/**
 * chinaPTE · audio engine stub
 * Prefers prebuilt HTMLAudio URL when available; otherwise falls back to speechSynthesis.
 * Full edge-tts / clip library generation is deferred — this round keeps Web Speech primary.
 *
 * Usage (future):
 *   ChinaPTEAudio.speak(text, { lang, rate, voice, audioUrl }) -> Promise
 */
(function (global) {
  "use strict";

  var activeAudio = null;

  function cancel() {
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio.removeAttribute("src");
        activeAudio.load();
      } catch (e) {}
      activeAudio = null;
    }
    if (window.speechSynthesis) {
      try {
        speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  /**
   * @param {string} text
   * @param {object} opts
   * @param {string} [opts.audioUrl] - prebuilt clip URL (mp3/ogg/wav)
   * @param {string} [opts.lang]
   * @param {number} [opts.rate]
   * @param {SpeechSynthesisVoice} [opts.voice]
   * @returns {Promise<{interrupted?:boolean, via?:string}>}
   */
  function speak(text, opts) {
    opts = opts || {};
    if (opts.audioUrl) {
      return new Promise(function (resolve, reject) {
        cancel();
        var a = new Audio(opts.audioUrl);
        activeAudio = a;
        a.onended = function () {
          if (activeAudio === a) activeAudio = null;
          resolve({ via: "html-audio" });
        };
        a.onerror = function (e) {
          if (activeAudio === a) activeAudio = null;
          // Fall back to TTS if clip fails
          speakViaTts(text, opts).then(resolve, reject);
        };
        var p = a.play();
        if (p && typeof p.catch === "function") {
          p.catch(function () {
            speakViaTts(text, opts).then(resolve, reject);
          });
        }
      });
    }
    return speakViaTts(text, opts);
  }

  function speakViaTts(text, opts) {
    return new Promise(function (resolve, reject) {
      if (!window.speechSynthesis) {
        reject(new Error("no speechSynthesis"));
        return;
      }
      var u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || "en-US";
      u.rate = opts.rate != null ? opts.rate : 1;
      u.pitch = opts.pitch != null ? opts.pitch : 1;
      u.volume = 1;
      if (opts.voice) u.voice = opts.voice;
      u.onend = function () {
        resolve({ via: "speechSynthesis" });
      };
      u.onerror = function (e) {
        if (e.error === "interrupted" || e.error === "canceled") {
          resolve({ interrupted: true, via: "speechSynthesis" });
        } else {
          reject(e);
        }
      };
      speechSynthesis.cancel();
      setTimeout(function () {
        speechSynthesis.speak(u);
      }, 40);
    });
  }

  global.ChinaPTEAudio = {
    speak: speak,
    cancel: cancel,
    /** Placeholder: map item id / phrase → clip path when library exists */
    resolveClipUrl: function (/* key */) {
      return null;
    },
  };
})(typeof window !== "undefined" ? window : globalThis);
