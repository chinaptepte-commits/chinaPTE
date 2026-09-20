# Free talking-head / lip-sync stack · chinaPTE (proven 2026-09-20 CST)

> **Goal:** 12–20s 9:16 TikTok with **moving mouth + synced dialogue** at **$0 paid video**.  
> **No** Runway paid video · **No** Fastlane Talking Head (60 credits).

---

## Proven zero-paid path (this box)

| Step | Tool | Cost | Notes |
|------|------|------|-------|
| 1. Portrait | Runway MCP `generate_image` · `nano-banana-2` · 9:16 | Free plan images OK | Front-facing, mouth slightly open |
| 2. VO | `edge-tts` (`/workspace/chinaPTE-tts-venv`) | $0 | CN Xiaoxiao/Yunxi + EN Jenny |
| 3. Lip-sync | **Wav2Lip ONNX 256** (`instant-high/wav2lip-onnx-256`) | $0 | **CPU ~6–7 fps** on this box (no GPU) |
| 4. Finish | `ffmpeg` scale 1080×1920 + burn-in captions + soft BGM | $0 | |

**Demo output:** `growth/tiktok-out/tt-wfd-talk-free-2026-09-20.mp4`  
(~15.7s · 1080×1920 · h264+aac · mouth motion + EN/CN VO)

**Working dir / scratch:** `growth/tiktok-out/talk-free/`  
**ONNX env:** `/workspace/wav2lip-venv` · repo `/workspace/wav2lip-onnx-256`  
**Weights:** `checkpoints/wav2lip_256.onnx` (~205MB from GitHub release v1.0.0)

### One-shot inference (CPU)

```bash
source /workspace/wav2lip-venv/bin/activate
cd /workspace/wav2lip-onnx-256
python -W ignore inference_onnxModel.py \
  --checkpoint_path checkpoints/wav2lip_256.onnx \
  --face /path/portrait.png \
  --audio /path/vo-clean.wav \
  --outfile /path/w2l-raw.mp4 \
  --nosmooth --pads 0 15 0 0 --fps 25
```

Patches applied on this box (keep if re-cloning):
- `device = 'cpu'` (was hardcoded `cuda`)
- remove `cv2.imshow` (headless)
- img_size=256 when path contains `256`
- face bbox `int(bboxes[0,0])` (numpy 2.x)

---

## Research snapshot (alternatives)

| Option | Lip-sync from audio? | GPU needed? | Verdict for chinaPTE free |
|--------|----------------------|-------------|---------------------------|
| **Wav2Lip ONNX 256** | Yes (photo or video) | No (CPU OK) | **Default proven** |
| MuseTalk 1.5 | Yes (needs driving video) | Yes (~4–8GB+) | Better quality; blocked here (no NVIDIA) |
| SadTalker | Yes (photo→full head) | Prefer GPU | Heavier; HF Spaces flaky |
| LivePortrait | Motion transfer (driving video), not audio lip-sync alone | Prefer GPU | Closest free *motion* if no lip model |
| Hallo / MuseTalk HF Spaces | Yes | ZeroGPU queue | Unreliable for batch |
| CapCut web free | Talking-avatar templates vary | Cloud | Policy/UI fragile for agents |
| Runway Free video | — | — | `availableVideoModels=[]` |
| Fastlane Talking Head | Yes | Cloud | **60 credits** — avoid |

---

## Script pattern (WFD commute hook)

1. CN hook — 公交上又空白？WFD 第一遍别死磕整句。  
2. EN SVE — Just grab Subject. Verb. End.  
3. CN CTA — 奥克兰通勤也能练。主页跟读，chinapte.net  

Generate segments with `edge-tts --write-media`, concat to 16kHz mono WAV for Wav2Lip, then mux soft BGM at ~0.12 volume.

---

## Limitations (honest)

1. **No GPU on shared box** → MuseTalk/SadTalker/LivePortrait full quality not runnable here; Wav2Lip-ONNX is the workable free lip-sync.  
2. **Wav2Lip quality:** mouth region only; can look slightly soft/warped at 256→upscale; best with clear frontal face.  
3. **Static head:** photo input ⇒ lips move, head/eyes mostly still (not full performance avatar). For more motion without paid video: generate a short driving clip elsewhere or use LivePortrait *if* a GPU box appears.  
4. **~1 min CPU** for ~16s @25fps (540p face); 1080p face would be slower.  
5. Runway images OK on Free; **do not** call Runway `generate_video` / Fastlane Talking Head for daily volume.

---

## Success criteria checklist

- [x] Playable MP4 9:16  
- [x] Visible mouth/face motion (not Ken Burns)  
- [x] Synced speech (edge-tts VO muxed)  
- [x] EN SVE + CN narration  
- [x] Zero paid video / zero Fastlane TH credits  

Proof frames: `growth/tiktok-out/talk-free/proof-frames/`
