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
          background: `radial-gradient(ellipse at 30% ${20 + drift}%, ${NAVY2} 0%, ${NAVY} 55%, #050914 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL}18 0%, transparent 70%)`,
        }}
      />
      {/* brand strip */}
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
        chinaPTE · NZ 华人
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
          output: "perceptual-scale",
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
              lineHeight: 1.15,
            }}
          >
            NZ 工地 induction
          </div>
        </PopIn>
        <PopIn delay={8} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 92,
              color: GOLD,
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            全听不懂？
          </div>
        </PopIn>
        <PopIn delay={18} style={{ marginTop: 40 }}>
          <div
            style={{
              display: "inline-block",
              border: `3px solid ${GOLD}`,
              borderRadius: 999,
              padding: "14px 36px",
              color: GOLD,
              fontFamily: FONT,
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            先抓这 5 个安全词
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

type WordBeat = {
  en: string;
  zh: string;
  tip: string;
  n: number;
  accent: string;
};

const Beat: React.FC<WordBeat> = ({ en, zh, tip, n, accent }) => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [0, 12], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <AbsoluteFill>
      <Bg accent={accent} />
      {/* side accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 160,
          bottom: 220,
          width: 14,
          background: accent,
          scale: `${1} ${bar}`,
          transformOrigin: "top center",
        }}
      />
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
              fontSize: 30,
              color: accent,
              fontWeight: 800,
              letterSpacing: 6,
              marginBottom: 24,
            }}
          >
            {n} / 5
          </div>
        </PopIn>
        <PopIn delay={2}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: en.length > 12 ? 78 : 108,
              color: WHITE,
              textAlign: "center",
              lineHeight: 1.05,
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
              fontSize: 56,
              color: GOLD,
              textAlign: "center",
            }}
          >
            {zh}
          </div>
        </PopIn>
        <PopIn delay={14} style={{ marginTop: 36 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              color: MUTED,
              textAlign: "center",
              maxWidth: 860,
              lineHeight: 1.35,
            }}
          >
            {tip}
          </div>
        </PopIn>
      </AbsoluteFill>
      {/* progress pips */}
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
        {[1, 2, 3, 4, 5].map((i) => (
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
        padding: "0 64px",
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
            lineHeight: 1.25,
          }}
        >
          听懂安全词
        </div>
      </PopIn>
      <PopIn delay={6} style={{ marginTop: 16 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 64,
            color: GOLD,
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          比多干半小时更重要
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
              fontSize: 70,
              color: WHITE,
              textAlign: "center",
              scale: pulse,
            }}
          >
            主页有跟读
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
        <PopIn delay={14} style={{ marginTop: 48 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 28,
              color: MUTED,
              textAlign: "center",
            }}
          >
            建筑专题 · 免费练
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const WORDS: WordBeat[] = [
  {
    n: 1,
    en: "PPE",
    zh: "个人防护装备",
    tip: "进场第一句：Got your PPE?",
    accent: TEAL,
  },
  {
    n: 2,
    en: "hard hat",
    zh: "安全帽",
    tip: "Hard hat on — 没戴别进场",
    accent: GOLD,
  },
  {
    n: 3,
    en: "hazard",
    zh: "危险 / 隐患",
    tip: "Report the hazard 要会说",
    accent: RED,
  },
  {
    n: 4,
    en: "scaffold",
    zh: "脚手架",
    tip: "Scaffold tagged? 先看标签",
    accent: "#6C8CFF",
  },
  {
    n: 5,
    en: "emergency exit",
    zh: "紧急出口",
    tip: "Where is the emergency exit?",
    accent: TEAL,
  },
];

/** 25s @ 30fps */
export const NzInduction: React.FC = () => {
  const fps = 30;
  const hook = Math.round(2.0 * fps); // 60
  const beat = Math.round(3.4 * fps); // 102
  const payoff = Math.round(3.0 * fps); // 90
  // CTA fills remainder

  let at = 0;
  const seq: React.ReactNode[] = [];
  seq.push(
    <Sequence key="hook" from={at} durationInFrames={hook}>
      <Hook />
    </Sequence>,
  );
  at += hook;
  WORDS.forEach((w, i) => {
    seq.push(
      <Sequence key={`b${i}`} from={at} durationInFrames={beat}>
        <Beat {...w} />
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
  const total = 25 * fps;
  seq.push(
    <Sequence key="cta" from={at} durationInFrames={total - at}>
      <Cta />
    </Sequence>,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      {/* silent=bug: VO+BGM required on every render */}
      <AudioTracks mixFile="audio/nz-mix.m4a" />
      {seq}
    </AbsoluteFill>
  );
};

export const DURATION = 25 * 30;
export const FPS = 30;
