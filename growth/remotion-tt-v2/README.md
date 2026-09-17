# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!


## Audio (required)

**Silent TikTok exports are a bug.** Every composition must include voiceover + light BGM via `AudioTracks` (`src/AudioTracks.tsx`). Assets live in `public/audio/`:

- `nz-mix.m4a` / `rs-mix.m4a` — pre-mixed Mandarin VO + soft bed (~-18dB music)
- `nz-vo.mp3` / `rs-vo.mp3` / `bgm-soft.mp3` — raw stems for remix

Regenerate VO with edge-tts (zh-CN-XiaoxiaoNeural) then remix with ffmpeg before render if scripts change.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
