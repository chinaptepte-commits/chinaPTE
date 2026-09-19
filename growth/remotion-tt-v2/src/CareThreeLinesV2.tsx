import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { AudioTracks } from "./AudioTracks";

/** Retention remake 2026-09-19 — frames locked to care-v2-timeline.json */
export const FPS = 30;
export const DURATION = 480; // 16.0s

const NAVY = "#070D1A";
const NAVY2 = "#101A33";
const GOLD = "#F0C14A";
const WHITE = "#F7F8FC";
const MUTED = "#A8B0C4";
const RED = "#E85D4C";
const TEAL = "#3ECFBF";
const BLUE = "#6C8CFF";
const CARE = "#7EC8E3";

const FONT =
  '"Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Bg: React.FC<{ accent?: string }> = ({ accent = GOLD }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 90], [0, 18], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <div
        style={{
          position: "absolute",
          inset: -40,
          background: `radial-gradient(ellipse at 70% ${25 + drift}%, ${NAVY2} 0%, ${NAVY} 55%, #050914 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -60,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 160,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL}16 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          textAlign: "center",
          color: MUTED,
          fontSize: 26,
          fontFamily: FONT,
          letterSpacing: 4,
          fontWeight: 600,
        }}
      >
        chinaPTE · 护理英语
      </div>
    </AbsoluteFill>
  );
};

const PopIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.65 },
  });
  const opacity = interpolate(frame - delay, [0, 4], [0, 1], clamp);
  return (
    <div
      style={{
        opacity,
        scale: interpolate(t, [0, 1], [0.7, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        }),
        translate: `0px ${interpolate(t, [0, 1], [40, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** 0–78: shame hook */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 6, 16], [0.45, 0, 0], clamp);
  const shake =
    frame < 14
      ? Math.sin(frame * 2.4) * interpolate(frame, [0, 14], [10, 0], clamp)
      : 0;
  return (
    <AbsoluteFill>
      <Bg accent={RED} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(232,93,76,${flash})`,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 44px",
          translate: `${shake}px 0px`,
        }}
      >
        <PopIn>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 56,
              color: WHITE,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            第一天上班听不懂？
          </div>
        </PopIn>
        <PopIn delay={8} style={{ marginTop: 24 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 84,
              color: RED,
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            直接丢人！
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** bridge: cheat-code promise */
const Bridge: React.FC = () => (
  <AbsoluteFill>
    <Bg accent={GOLD} />
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 48px",
      }}
    >
      <PopIn>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 64,
            color: WHITE,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          三句保命
        </div>
      </PopIn>
      <PopIn delay={6} style={{ marginTop: 20 }}>
        <div
          style={{
            display: "inline-block",
            border: `3px solid ${GOLD}`,
            borderRadius: 999,
            padding: "12px 32px",
            color: GOLD,
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 800,
          }}
        >
          先背 · 别硬撑
        </div>
      </PopIn>
    </AbsoluteFill>
  </AbsoluteFill>
);

/** pattern interrupt card */
const Flash: React.FC<{ n: number; label: string; accent: string }> = ({
  n,
  label,
  accent,
}) => {
  const frame = useCurrentFrame();
  const punch = interpolate(frame, [0, 4, 10], [1.15, 1, 1], clamp);
  const flash = interpolate(frame, [0, 5, 12], [0.35, 0, 0], clamp);
  const overlay =
    accent === CARE
      ? `rgba(126,200,227,${flash})`
      : accent === TEAL
        ? `rgba(62,207,191,${flash})`
        : `rgba(108,140,255,${flash})`;
  return (
    <AbsoluteFill>
      <Bg accent={accent} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlay,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: punch,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 120,
            color: accent,
            lineHeight: 1,
          }}
        >
          {n}
        </div>
        <div
          style={{
            marginTop: 16,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 48,
            color: WHITE,
          }}
        >
          {label}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

type BeatProps = {
  n: number;
  en: string;
  zh: string;
  accent: string;
  /** frames from beat start until ZH VO / text */
  zhAt: number;
};

const Beat: React.FC<BeatProps> = ({ n, en, zh, accent, zhAt }) => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [0, 8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  // EN lands frame 0 of this Sequence (= VO English onset)
  const enPulse = interpolate(frame, [0, 3, 10], [1.08, 1, 1], clamp);
  return (
    <AbsoluteFill>
      <Bg accent={accent} />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 160,
          bottom: 220,
          width: 14,
          background: accent,
          scale: `1 ${bar}`,
          transformOrigin: "top center",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 28,
            color: accent,
            fontWeight: 800,
            letterSpacing: 4,
            marginBottom: 18,
            opacity: interpolate(frame, [0, 4], [0, 1], clamp),
          }}
        >
          保命句 {n}/3
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: en.length > 24 ? 46 : 54,
            color: WHITE,
            textAlign: "center",
            lineHeight: 1.15,
            textShadow: `0 0 48px ${accent}66`,
            scale: enPulse,
            opacity: interpolate(frame, [0, 2], [0, 1], clamp),
          }}
        >
          {en}
        </div>
        <PopIn delay={zhAt} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 44,
              color: GOLD,
              textAlign: "center",
            }}
          >
            {zh}
          </div>
        </PopIn>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: i === n ? 36 : 14,
              height: 14,
              borderRadius: 99,
              background: i === n ? accent : "#2A3350",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Payoff: React.FC = () => (
  <AbsoluteFill>
    <Bg accent={TEAL} />
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 48px",
      }}
    >
      <PopIn>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 58,
            color: WHITE,
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          短 · 清楚 · 有礼貌
        </div>
      </PopIn>
      <PopIn delay={10} style={{ marginTop: 28 }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 32,
            color: MUTED,
            textAlign: "center",
          }}
        >
          先开口 · 再动手
        </div>
      </PopIn>
    </AbsoluteFill>
  </AbsoluteFill>
);

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 24, [0, 12, 24], [1, 1.05, 1], clamp);
  return (
    <AbsoluteFill>
      <Bg accent={GOLD} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 56px",
        }}
      >
        <PopIn>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 72,
              color: WHITE,
              textAlign: "center",
              scale: pulse,
            }}
          >
            主页跟读
          </div>
        </PopIn>
        <PopIn delay={6} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 40,
              color: GOLD,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            chinapte.net
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Scene map from care-v2-timeline.json (VO-locked).
 * EN on-screen start == EN VO onset (±0 frames by construction).
 */
const SCENES = {
  hook: { from: 0, dur: 78 },
  bridge: { from: 78, dur: 35 }, // 78→113
  flash1: { from: 113, dur: 16 }, // 113→129
  beat1: { from: 129, dur: 59 }, // 129→188
  flash2: { from: 188, dur: 16 },
  beat2: { from: 204, dur: 48 }, // 204→252
  flash3: { from: 252, dur: 16 },
  beat3: { from: 268, dur: 78 }, // 268→346
  payoff: { from: 346, dur: 55 }, // 346→401
  cta: { from: 401, dur: 79 }, // 401→480
} as const;

// ZH relative delays inside each beat (= zh.start_frame - beat.from)
const ZH1_AT = 162 - 129; // 33
const ZH2_AT = 232 - 204; // 28
const ZH3_AT = 307 - 268; // 39

export const CareThreeLinesV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <AudioTracks mixFile="audio/care-v2-mix.m4a" />
      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.dur}>
        <Hook />
      </Sequence>
      <Sequence from={SCENES.bridge.from} durationInFrames={SCENES.bridge.dur}>
        <Bridge />
      </Sequence>
      <Sequence from={SCENES.flash1.from} durationInFrames={SCENES.flash1.dur}>
        <Flash n={1} label="起身" accent={CARE} />
      </Sequence>
      <Sequence from={SCENES.beat1.from} durationInFrames={SCENES.beat1.dur}>
        <Beat
          n={1}
          en="I'll help you sit up."
          zh="帮您坐起来"
          accent={CARE}
          zhAt={ZH1_AT}
        />
      </Sequence>
      <Sequence from={SCENES.flash2.from} durationInFrames={SCENES.flash2.dur}>
        <Flash n={2} label="疼痛" accent={TEAL} />
      </Sequence>
      <Sequence from={SCENES.beat2.from} durationInFrames={SCENES.beat2.dur}>
        <Beat
          n={2}
          en="Are you in pain?"
          zh="您疼吗？"
          accent={TEAL}
          zhAt={ZH2_AT}
        />
      </Sequence>
      <Sequence from={SCENES.flash3.from} durationInFrames={SCENES.flash3.dur}>
        <Flash n={3} label="呼叫铃" accent={BLUE} />
      </Sequence>
      <Sequence from={SCENES.beat3.from} durationInFrames={SCENES.beat3.dur}>
        <Beat
          n={3}
          en="Please use the call bell."
          zh="请按呼叫铃"
          accent={BLUE}
          zhAt={ZH3_AT}
        />
      </Sequence>
      <Sequence from={SCENES.payoff.from} durationInFrames={SCENES.payoff.dur}>
        <Payoff />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.dur}>
        <Cta />
      </Sequence>
    </AbsoluteFill>
  );
};
