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
          fontSize: 28,
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
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });
  const opacity = interpolate(frame - delay, [0, 6], [0, 1], clamp);
  return (
    <div
      style={{
        opacity,
        scale: interpolate(t, [0, 1], [0.72, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        }),
        translate: `0px ${interpolate(t, [0, 1], [36, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 8, 18], [0.35, 0, 0], clamp);
  const shake =
    frame < 12
      ? Math.sin(frame * 2.2) * interpolate(frame, [0, 12], [8, 0], clamp)
      : 0;
  return (
    <AbsoluteFill>
      <Bg accent={CARE} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(126,200,227,${flash})`,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 48px",
          translate: `${shake}px 0px`,
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
              lineHeight: 1.15,
            }}
          >
            新西兰养老护理？
          </div>
        </PopIn>
        <PopIn delay={10} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 78,
              color: CARE,
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            先会这 3 句
          </div>
        </PopIn>
        <PopIn delay={20} style={{ marginTop: 40 }}>
          <div
            style={{
              display: "inline-block",
              border: `3px solid ${GOLD}`,
              borderRadius: 999,
              padding: "14px 36px",
              color: GOLD,
              fontFamily: FONT,
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            短 · 清楚 · 有礼貌
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

type BeatProps = {
  n: number;
  en: string;
  zh: string;
  tip: string;
  accent: string;
};

const Beat: React.FC<BeatProps> = ({ n, en, zh, tip, accent }) => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [0, 12], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
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
          padding: "0 44px",
        }}
      >
        <PopIn>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 30,
              color: accent,
              fontWeight: 800,
              letterSpacing: 6,
              marginBottom: 20,
            }}
          >
            第 {n} 句 / 3
          </div>
        </PopIn>
        <PopIn delay={2}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: en.length > 22 ? 48 : 56,
              color: WHITE,
              textAlign: "center",
              lineHeight: 1.15,
              textShadow: `0 0 40px ${accent}55`,
            }}
          >
            {en}
          </div>
        </PopIn>
        <PopIn delay={8} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 42,
              color: GOLD,
              textAlign: "center",
            }}
          >
            {zh}
          </div>
        </PopIn>
        <PopIn delay={14} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 30,
              color: MUTED,
              textAlign: "center",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {tip}
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
        padding: "0 56px",
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
            lineHeight: 1.25,
          }}
        >
          沟通要短、清楚
        </div>
      </PopIn>
      <PopIn delay={6} style={{ marginTop: 12 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 56,
            color: GOLD,
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          还要有礼貌
        </div>
      </PopIn>
      <PopIn delay={14} style={{ marginTop: 40 }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 26,
            color: MUTED,
            textAlign: "center",
          }}
        >
          非资格培训 · 仅英语练习
        </div>
      </PopIn>
    </AbsoluteFill>
  </AbsoluteFill>
);

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.04, 1], clamp);
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
              fontSize: 64,
              color: WHITE,
              textAlign: "center",
              scale: pulse,
            }}
          >
            主页跟读
          </div>
        </PopIn>
        <PopIn delay={8} style={{ marginTop: 32 }}>
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
        <PopIn delay={14} style={{ marginTop: 40 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 28,
              color: MUTED,
              textAlign: "center",
            }}
          >
            护理专题 · 免费练
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BEATS: BeatProps[] = [
  {
    n: 1,
    en: "I'll help you sit up.",
    zh: "我来帮您坐起来",
    tip: "协助起身 · 先说再做",
    accent: CARE,
  },
  {
    n: 2,
    en: "Are you in pain?",
    zh: "您现在疼吗？",
    tip: "关心疼痛 · 短问一句",
    accent: TEAL,
  },
  {
    n: 3,
    en: "Please use the call bell.",
    zh: "请按呼叫铃",
    tip: "礼貌提醒 · 安全优先",
    accent: BLUE,
  },
];

/** ~28s @ 30fps — VO length aligned */
export const CareThreeLines: React.FC = () => {
  const fps = 30;
  const hook = Math.round(2.4 * fps);
  const beat = Math.round(5.2 * fps);
  const payoff = Math.round(3.6 * fps);
  const total = 28 * fps;

  let at = 0;
  const seq: React.ReactNode[] = [];
  seq.push(
    <Sequence key="hook" from={at} durationInFrames={hook}>
      <Hook />
    </Sequence>,
  );
  at += hook;
  BEATS.forEach((b, i) => {
    seq.push(
      <Sequence key={`b${i}`} from={at} durationInFrames={beat}>
        <Beat {...b} />
      </Sequence>,
    );
    at += beat;
  });
  seq.push(
    <Sequence key="pay" from={at} durationInFrames={payoff}>
      <Payoff />
    </Sequence>,
  );
  at += payoff;
  seq.push(
    <Sequence key="cta" from={at} durationInFrames={total - at}>
      <Cta />
    </Sequence>,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      {/* silent=bug: VO+BGM required on every render */}
      <AudioTracks mixFile="audio/care-mix.m4a" />
      {seq}
    </AbsoluteFill>
  );
};

export const DURATION = 28 * 30;
export const FPS = 30;
