/**
 * Headless check: 随身听 单题循环 N times, then advance.
 * Uses mocked HTMLAudio (no browser). The progress <input type="range">
 * fires a synchronous "input" event when its value is assigned — the mobile
 * behavior that used to soft-stop playback on auto-advance.
 *
 *   node test/walkman-loop.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exitCode = 1;
    throw new Error(msg);
  }
}

function kindOf(src) {
  const s = String(src);
  if (/-en\.mp3$/.test(s)) return "en";
  if (/-zh\.mp3$/.test(s)) return "zh";
  if (/-gloss\.mp3$/.test(s)) return "gloss";
  if (/-word\.mp3$/.test(s)) return "word";
  if (/-spell\.mp3$/.test(s)) return "spell";
  return s;
}

function createHarness() {
  const timers = [];
  let seq = 1;
  let now = 0;

  function setTimeout(fn, ms) {
    const t = { id: seq++, fn, at: now + (Number(ms) || 0), interval: false };
    timers.push(t);
    return t.id;
  }
  function clearTimer(id) {
    const i = timers.findIndex((t) => t.id === id);
    if (i >= 0) timers.splice(i, 1);
  }
  function setInterval(fn, ms) {
    const every = Number(ms) || 0;
    const t = { id: seq++, fn, at: now + every, interval: true, ms: every };
    timers.push(t);
    return t.id;
  }

  class ClassList {
    constructor() { this.set = new Set(); }
    add(...xs) { xs.forEach((x) => this.set.add(x)); }
    remove(...xs) { xs.forEach((x) => this.set.delete(x)); }
    toggle(c, force) {
      const on = force != null ? !!force : !this.set.has(c);
      if (on) this.set.add(c); else this.set.delete(c);
      return on;
    }
    contains(c) { return this.set.has(c); }
  }

  class El {
    constructor(tag) {
      this.tagName = String(tag || "div").toUpperCase();
      this.id = "";
      this.classList = new ClassList();
      this._class = "";
      this.children = [];
      this.parentElement = null;
      this.hidden = false;
      this.style = {};
      this.textContent = "";
      this._html = "";
      this.dataset = {};
      this.attrs = {};
      this.listeners = {};
      this._value = "";
      this.min = "";
      this.max = "";
      this.disabled = false;
      this.type = "";
      this.firesInputOnValue = false;
    }
    get className() { return this._class; }
    set className(v) {
      this._class = String(v || "");
      this.classList.set = new Set(this._class.split(/\s+/).filter(Boolean));
    }
    get value() { return this._value; }
    set value(v) {
      const prev = this._value;
      this._value = v == null ? "" : String(v);
      if (this.firesInputOnValue && prev !== this._value) {
        this.dispatchEvent({ type: "input", target: this });
      }
    }
    setAttribute(k, v) {
      this.attrs[k] = String(v);
      if (k === "data-play-mode") this.dataset.playMode = String(v);
    }
    getAttribute(k) {
      if (k === "data-play-mode" && this.dataset.playMode) return this.dataset.playMode;
      return this.attrs[k] == null ? null : this.attrs[k];
    }
    addEventListener(type, fn) {
      (this.listeners[type] || (this.listeners[type] = [])).push(fn);
    }
    dispatchEvent(ev) {
      const type = ev.type || ev;
      for (const fn of (this.listeners[type] || []).slice()) fn.call(this, ev);
      return true;
    }
    appendChild(ch) {
      ch.parentElement = this;
      this.children.push(ch);
      return ch;
    }
    insertAdjacentElement(pos, el) {
      const parent = this.parentElement;
      if (!parent) return el;
      const i = parent.children.indexOf(this);
      parent.children.splice(pos === "afterend" ? i + 1 : i, 0, el);
      el.parentElement = parent;
      return el;
    }
    querySelectorAll(sel) { return queryAll(this, sel); }
    querySelector(sel) { return queryAll(this, sel)[0] || null; }
    click() { this.dispatchEvent({ type: "click", target: this, preventDefault() {} }); }
    set innerHTML(html) {
      this._html = String(html || "");
      this.children = [];
    }
    get innerHTML() { return this._html; }
  }

  function match(el, sel) {
    if (!el || !el.tagName) return false;
    if (sel.startsWith("#")) return el.id === sel.slice(1);
    if (sel.startsWith(".")) return el.classList.contains(sel.slice(1));
    if (sel === "[data-play-mode]") return el.getAttribute("data-play-mode") != null;
    const dot = sel.indexOf(".");
    if (dot > 0) {
      return el.tagName.toLowerCase() === sel.slice(0, dot) && el.classList.contains(sel.slice(dot + 1));
    }
    return el.tagName.toLowerCase() === sel.toLowerCase();
  }
  function queryAll(root, sel) {
    const out = [];
    const walk = (n) => {
      if (n && n.tagName && n !== root && match(n, sel)) out.push(n);
      (n.children || []).forEach(walk);
    };
    walk(root);
    return out;
  }

  const body = new El("body");
  const ids = {};
  function add(id, tag, opts) {
    const el = new El(tag || "div");
    el.id = id;
    if (opts && opts.className) el.className = opts.className;
    if (opts && opts.firesInputOnValue) el.firesInputOnValue = true;
    body.appendChild(el);
    ids[id] = el;
    return el;
  }

  add("btnPlayAll", "button", { className: "btn-play-all" });
  add("playAllIcon", "span");
  add("playAllLabel", "span");
  add("btnPrev", "button");
  add("btnNext", "button");
  add("btnPlayPause", "button");
  add("playPauseIcon", "span");
  add("playPauseLabel", "span");
  add("btnReplay", "button");
  add("btnStop", "button");
  add("btnToggleZh", "button");
  add("sentenceEn", "p");
  add("sentenceZh", "p");
  add("vocabChips", "div");
  add("progressText", "span");
  add("progressFill", "div");
  const range = add("progressRange", "input", { firesInputOnValue: true });
  range.type = "range";
  range._value = "1";
  add("jumpInput", "input");
  add("btnJump", "button");
  add("jumpError", "span");
  add("phaseText", "span");
  add("statusBadge", "span");
  add("statusText", "span");
  add("todayCount", "span");
  add("streakCount", "span");
  add("speechWarn", "div");
  add("loopCount", "input");
  add("btnLoopMinus", "button");
  add("btnLoopPlus", "button");
  add("loopIndicator", "span");
  add("btnKeepAlive", "button");
  add("btnWakeLock", "button");
  const nav = add("navControls", "nav", { className: "controls" });
  nav.id = "";
  delete ids.navControls;
  add("options", "div", { className: "options" });

  const document = {
    body,
    readyState: "complete",
    activeElement: null,
    hidden: false,
    visibilityState: "visible",
    getElementById(id) { return ids[id] || null; },
    createElement(tag) { return new El(tag); },
    querySelector(sel) { return queryAll(body, sel)[0] || null; },
    querySelectorAll(sel) { return queryAll(body, sel); },
    addEventListener(type, fn) { body.addEventListener(type, fn); },
    dispatchEvent(ev) { return body.dispatchEvent(ev); },
  };

  const store = new Map();
  const localStorage = {
    getItem(k) { return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { store.set(k, String(v)); },
    removeItem(k) { store.delete(k); },
  };

  const speaks = [];
  const holder = { player: null };

  class MockAudio {
    constructor() {
      this.paused = true;
      this.ended = false;
      this.loop = false;
      this.volume = 1;
      this.playbackRate = 1;
      this.preload = "";
      this.currentTime = 0;
      this.src = "";
      this.onended = null;
      this.onerror = null;
      this._handlers = {};
      this._stopping = false;
    }
    setAttribute() {}
    getAttribute(n) { return n === "src" ? this.src : null; }
    removeAttribute(n) { if (n === "src") this.src = ""; }
    addEventListener(type, fn) {
      (this._handlers[type] || (this._handlers[type] = [])).push(fn);
    }
    _emit(type) {
      if (type === "ended" && typeof this.onended === "function") this.onended();
      if (type === "error" && typeof this.onerror === "function") this.onerror();
      for (const fn of this._handlers[type] || []) fn({ type });
    }
    load() {}
    pause() {
      this._stopping = true;
      this.paused = true;
      this._emit("pause");
    }
    play() {
      const src = String(this.src || "");
      this._stopping = false;
      this.paused = false;
      this.ended = false;
      if (!src.startsWith("data:") && holder.player) {
        const st = holder.player.state;
        speaks.push({ index: st.index, loopPass: st.loopPass, kind: kindOf(src), src });
      }
      const self = this;
      setTimeout(() => {
        if (self._stopping || self.src !== src || self.loop) return;
        self.ended = true;
        self.paused = true;
        self._emit("ended");
        self._emit("pause");
      }, 5);
      return Promise.resolve();
    }
  }

  const sandbox = {
    console,
    setTimeout,
    clearTimeout: clearTimer,
    setInterval,
    clearInterval: clearTimer,
    btoa,
    Promise,
    Date,
    Math,
    Number,
    String,
    parseInt,
    JSON,
    Object,
    Array,
    Error,
    RegExp,
    isNaN,
    localStorage,
    document,
    CustomEvent: class CustomEvent {
      constructor(type, init) {
        this.type = type;
        this.detail = init && init.detail;
      }
    },
    Audio: MockAudio,
    MediaMetadata: function MediaMetadata(d) { this.data = d; },
    navigator: {
      mediaSession: {
        playbackState: "none",
        metadata: null,
        setActionHandler() {},
      },
      wakeLock: null,
    },
    speechSynthesis: {
      speaking: false,
      pending: false,
      paused: false,
      getVoices() { return []; },
      cancel() {},
      resume() {},
      speak(u) {
        this.speaking = true;
        setTimeout(() => {
          this.speaking = false;
          if (u.onend) u.onend();
        }, 5);
      },
      addEventListener() {},
    },
    fetch: async function fetch() {
      return {
        ok: true,
        json: async () => sandbox.__manifest,
      };
    },
    __manifest: { clips: {}, base: "audio/" },
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const winListeners = {};
  sandbox.addEventListener = function (type, fn) {
    (winListeners[type] || (winListeners[type] = [])).push(fn);
  };
  sandbox.removeEventListener = function (type, fn) {
    winListeners[type] = (winListeners[type] || []).filter((f) => f !== fn);
  };
  vm.createContext(sandbox);

  function load(file) {
    const code = fs.readFileSync(path.join(root, file), "utf8");
    vm.runInContext(code, sandbox, { filename: file });
  }
  load("keepalive.js");
  load("audio-engine.js");
  load("player.js");

  async function drainMicro() {
    await new Promise((r) => setImmediate(r));
  }

  async function flushUntil(pred, limit) {
    for (let i = 0; i < (limit || 20000) && !pred(); i++) {
      await drainMicro();
      if (!timers.length) break;
      timers.sort((a, b) => a.at - b.at);
      now = timers[0].at;
      const due = [];
      while (timers.length && timers[0].at <= now) due.push(timers.shift());
      for (const t of due) {
        if (t.interval) {
          t.at = now + t.ms;
          timers.push(t);
        }
        t.fn();
      }
    }
  }

  return { sandbox, speaks, holder, document, ids, flushUntil, drainMicro, localStorage };
}

function bank() {
  return [
    { id: 1, en: "Alpha sentence.", zhAnalysis: "甲", vocab: [{ word: "alpha", gloss: "阿尔法", spelling: "ALPHA" }] },
    { id: 2, en: "Beta sentence.", zhAnalysis: "乙", vocab: [{ word: "beta", gloss: "贝塔", spelling: "BETA" }] },
    { id: 3, en: "Gamma sentence.", zhAnalysis: "丙", vocab: [{ word: "gamma", gloss: "伽马", spelling: "GAMMA" }] },
  ];
}

function fillManifest(sandbox, items) {
  const clips = {};
  for (const item of items) {
    clips["wfd/" + item.id + "-en"] = "i" + item.id + "-en.mp3";
    clips["wfd/" + item.id + "-zh"] = "i" + item.id + "-zh.mp3";
    (item.vocab || []).forEach((v, i) => {
      clips["wfd/" + item.id + "-v" + i + "-gloss"] = "i" + item.id + "-gloss.mp3";
      clips["wfd/" + item.id + "-v" + i + "-word"] = "i" + item.id + "-word.mp3";
      clips["wfd/" + item.id + "-v" + i + "-spell"] = "i" + item.id + "-spell.mp3";
    });
  }
  sandbox.__manifest = { clips, base: "audio/" };
}

async function runCase(loopN, startBtn = "btnPlayAll") {
  const h = createHarness();
  const items = bank();
  fillManifest(h.sandbox, items);
  h.localStorage.setItem("chinaPTE_loop_count", String(loopN));
  h.localStorage.setItem("chinaPTE_play_mode", "walkman");
  const player = h.sandbox.ChinaPTEPlayer.create({
    bank: items,
    storagePrefix: "t" + loopN,
    mode: "wfd",
    bankName: "T",
  });
  h.holder.player = player;
  for (let i = 0; i < 8; i++) await h.drainMicro();
  const url = h.sandbox.ChinaPTEAudio.resolveClipUrl("wfd/1-en");
  assert(url === "audio/i1-en.mp3", "manifest clip url, got " + url);
  h.document.getElementById(startBtn).click();
  assert(player.state.playing && player.state.playAll, startBtn + " should start continuous play");
  await h.flushUntil(() => !player.state.playing && !player.state.playAll && h.speaks.length > 0);
  return { speaks: h.speaks, state: { ...player.state } };
}

function check(loopN, result) {
  const { speaks, state } = result;
  assert(speaks.length > 0, "loop=" + loopN + " produced no audio");
  assert(state.playing === false && state.playAll === false, "loop=" + loopN + " should stop at end of list");
  assert(state.index === 2, "loop=" + loopN + " should finish on last item, index=" + state.index);

  const order = ["en", "zh", "gloss", "word", "spell"];
  for (let index = 0; index < 3; index++) {
    const kinds = speaks.filter((s) => s.index === index).map((s) => s.kind);
    assert(kinds.length === order.length * loopN, "loop=" + loopN + " index " + index + " clips " + kinds.join(","));
    for (let pass = 0; pass < loopN; pass++) {
      const slice = kinds.slice(pass * order.length, (pass + 1) * order.length);
      assert(slice.join(",") === order.join(","), "loop=" + loopN + " index " + index + " pass " + (pass + 1) + " order " + slice.join(","));
    }
  }
  const firstSeen = [];
  for (const s of speaks) {
    if (firstSeen[firstSeen.length - 1] !== s.index) firstSeen.push(s.index);
  }
  assert(firstSeen.join(",") === "0,1,2", "loop=" + loopN + " index order " + firstSeen.join(","));
  console.log("ok loop=" + loopN, "clips", speaks.length, "finalIndex", state.index);
}

const r2 = await runCase(2);
check(2, r2);
const r1 = await runCase(1);
check(1, r1);
// Middle play/pause button must also advance through the list (随身听 is continuous).
const rp = await runCase(2, "btnPlayPause");
check(2, rp);
// 下一题 from idle: starts item 2 immediately and continues to item 3.
const rn = await runCase(1, "btnNext");
{
  const seen = [];
  for (const s of rn.speaks) if (seen[seen.length - 1] !== s.index) seen.push(s.index);
  assert(seen.join(",") === "1,2", "btnNext should play 1,2, got " + seen.join(","));
  assert(rn.state.index === 2, "btnNext should end on last item");
  console.log("ok next-autoplay", seen.join(","));
}
if (process.exitCode) process.exit(process.exitCode);
console.log("walkman loop advance: all checks passed");
