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
        chinaPTE · RS 跟读
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
  const flash = interpolate(frame, [0, 8, 18], [0.4, 0, 0], clamp);
  const shake =
    frame < 12
      ? Math.sin(frame * 2.2) * interpolate(frame, [0, 12], [8, 0], clamp)
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
          padding: "0 48px",
          translate: `${shake}px 0px`,
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
              lineHeight: 1.15,
            }}
          >
            PTE RS 卡了 3 秒？
          </div>
        </PopIn>
        <PopIn delay={10} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 88,
              color: RED,
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            录音直接没了
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
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            跟读 3 秒法则
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

type BeatProps = {
  n: number;
  title: string;
  sub: string;
  tip: string;
  accent: string;
};

const Beat: React.FC<BeatProps> = ({ n, title, sub, tip, accent }) => {
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
              marginBottom: 20,
            }}
          >
            法则 {n} / 3
          </div>
        </PopIn>
        <PopIn delay={2}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: title.length > 8 ? 72 : 92,
              color: WHITE,
              textAlign: "center",
              lineHeight: 1.08,
              textShadow: `0 0 40px ${accent}55`,
            }}
          >
            {title}
          </div>
        </PopIn>
        <PopIn delay={8} style={{ marginTop: 24 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 48,
              color: GOLD,
              textAlign: "center",
            }}
          >
            {sub}
          </div>
        </PopIn>
        <PopIn delay={14} style={{ marginTop: 32 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              color: MUTED,
              textAlign: "center",
              maxWidth: 880,
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
            fontSize: 60,
            color: WHITE,
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          流利开口
        </div>
      </PopIn>
      <PopIn delay={6} style={{ marginTop: 12 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 60,
            color: GOLD,
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          比完美复述更值钱
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
            主页练跟读
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
            RS 随身听 · 免费练
          </div>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BEATS: BeatProps[] = [
  {
    n: 1,
    title: "3 秒内开口",
    sub: "Recording 一亮就说",
    tip: "沉默超 3 秒 → 麦自动关",
    accent: RED,
  },
  {
    n: 2,
    title: "抓主干",
    sub: "主 · 谓 · 宾 · 数字",
    tip: "先保骨架，再补细节",
    accent: TEAL,
  },
  {
    n: 3,
    title: "忘词不停",
    sub: "卡住就往下说",
    tip: "别回头纠错 · 别沉默想",
    accent: BLUE,
  },
];

/** 24s @ 30fps */
export const RsThreeSecond: React.FC = () => {
  const fps = 30;
  const hook = Math.round(2.2 * fps);
  const beat = Math.round(4.0 * fps);
  const payoff = Math.round(3.2 * fps);
  const total = 24 * fps;

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
      <AudioTracks mixFile="audio/rs-mix.m4a" />
      {seq}
    </AbsoluteFill>
  );
};

export const DURATION = 24 * 30;
export const FPS = 30;
