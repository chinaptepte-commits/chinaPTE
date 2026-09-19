import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
} from "remotion";
import { AudioTracks } from "./AudioTracks";

/** v3 CHARACTER STORY — Runway stills + Ken Burns + edge-tts dialogue (VO-locked) */
export const FPS = 30;
export const DURATION = 505; // 16.833s

const GOLD = "#F0C14A";
const WHITE = "#F7F8FC";
const RED = "#E85D4C";
const TEAL = "#3ECFBF";
const BLUE = "#6C8CFF";
const CARE = "#7EC8E3";
const NAVY = "#070D1A";

const FONT =
  '"Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const SCENES = {
  hook: { from: 0, dur: 53 },
  humiliate: { from: 53, dur: 101 },
  bridge: { from: 154, dur: 35 },
  setup1: { from: 189, dur: 27 },
  beat1: { from: 216, dur: 58 },
  setup2: { from: 274, dur: 23 },
  beat2: { from: 297, dur: 48 },
  setup3: { from: 345, dur: 23 },
  beat3: { from: 368, dur: 70 },
  payoff: { from: 438, dur: 34 },
  cta: { from: 472, dur: 33 },
} as const;

const ZH1_AT = 29;
const ZH2_AT = 25;
const ZH3_AT = 36;

const STILLS = {
  freeze: "story/v3/01-freeze.png",
  humiliate: "story/v3/02-humiliate.png",
  situp: "story/v3/03-situp.png",
  pain: "story/v3/04-pain.png",
  callbell: "story/v3/05-callbell.png",
  relief: "story/v3/06-relief.png",
  caregiver: "story/v3/00-caregiver.png",
} as const;

/** Ken Burns photo plate with punch-in on cut */
const PhotoPlate: React.FC<{
  src: string;
  zoomFrom?: number;
  zoomTo?: number;
  dark?: number;
}> = ({ src, zoomFrom = 1.05, zoomTo = 1.18, dark = 0.28 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const punch = interpolate(frame, [0, 4, 12], [1.12, 1, 1], clamp);
  const ken = interpolate(frame, [0, Math.max(durationInFrames, 1)], [zoomFrom, zoomTo], {
    ...clamp,
    easing: Easing.linear,
  });
  const flash = interpolate(frame, [0, 3, 10], [0.35, 0, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: punch * ken }}>
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,${dark * 0.5}) 0%, rgba(0,0,0,${dark}) 55%, rgba(0,0,0,${Math.min(dark + 0.25, 0.7)}) 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(255,255,255,${flash * 0.4})`,
          pointerEvents: "none",
        }}
      />
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
    config: { damping: 12, stiffness: 220, mass: 0.55 },
  });
  const opacity = interpolate(frame - delay, [0, 3], [0, 1], clamp);
  return (
    <div
      style={{
        opacity,
        scale: interpolate(t, [0, 1], [0.7, 1]),
        translate: `0px ${interpolate(t, [0, 1], [36, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Caption: React.FC<{
  text: string;
  color?: string;
  size?: number;
  delay?: number;
  outline?: boolean;
}> = ({ text, color = WHITE, size = 48, delay = 0, outline = true }) => (
  <PopIn delay={delay}>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        color,
        textAlign: "center",
        lineHeight: 1.2,
        textShadow: outline
          ? "0 2px 0 #000, 0 4px 18px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.5)"
          : undefined,
        padding: "0 28px",
      }}
    >
      {text}
    </div>
  </PopIn>
);

const SpeechBubble: React.FC<{
  en: string;
  zh: string;
  accent: string;
  zhAt: number;
}> = ({ en, zh, accent, zhAt }) => {
  const frame = useCurrentFrame();
  const enPulse = interpolate(frame, [0, 3, 12], [1.08, 1, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 220,
        paddingLeft: 32,
        paddingRight: 32,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          background: "rgba(8,12,24,0.78)",
          border: `3px solid ${accent}`,
          borderRadius: 28,
          padding: "22px 28px 26px",
          scale: enPulse,
          boxShadow: `0 12px 40px ${accent}44`,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            color: accent,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          她说 → 你回
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: en.length > 24 ? 40 : 46,
            color: WHITE,
            lineHeight: 1.2,
            opacity: interpolate(frame, [0, 2], [0, 1], clamp),
          }}
        >
          {en}
        </div>
        <PopIn delay={zhAt} style={{ marginTop: 14 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: `${accent}22`,
              border: `2px solid ${accent}`,
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 34,
                color: GOLD,
              }}
            >
              {zh}
            </span>
            <span style={{ fontSize: 28, color: TEAL }}>✓</span>
          </div>
        </PopIn>
      </div>
    </AbsoluteFill>
  );
};

const TopTag: React.FC<{ text: string; color?: string }> = ({
  text,
  color = GOLD,
}) => (
  <div
    style={{
      position: "absolute",
      top: 72,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: FONT,
      fontSize: 24,
      fontWeight: 700,
      color,
      letterSpacing: 3,
      textShadow: "0 2px 8px rgba(0,0,0,0.8)",
    }}
  >
    {text}
  </div>
);

const Hook: React.FC = () => (
  <AbsoluteFill>
    <PhotoPlate src={STILLS.freeze} zoomFrom={1.08} zoomTo={1.22} dark={0.22} />
    <TopTag text="NZ aged care · Day 1" color={MUTED_SAFE} />
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 280,
      }}
    >
      <Caption text="老人盯着你" size={56} delay={4} />
      <div style={{ height: 12 }} />
      <Caption text="你僵住了" size={68} color={RED} delay={18} />
    </AbsoluteFill>
  </AbsoluteFill>
);

const MUTED_SAFE = "#C8D0E0";

const Humiliate: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 5, 14], [0.45, 0, 0], clamp);
  return (
    <AbsoluteFill>
      <PhotoPlate
        src={STILLS.humiliate}
        zoomFrom={1.06}
        zoomTo={1.16}
        dark={0.3}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(232,93,76,${flash})`,
        }}
      />
      <TopTag text="同事 · 老板都在看" color={RED} />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 260,
        }}
      >
        <Caption text="她在等你回话" size={44} delay={6} color={GOLD} />
        <div style={{ height: 10 }} />
        <Caption text="第一天就装傻？" size={44} delay={22} color={WHITE} />
        <div style={{ height: 14 }} />
        <Caption text="社死？" size={76} delay={42} color={RED} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Bridge: React.FC = () => (
  <AbsoluteFill>
    <PhotoPlate
      src={STILLS.caregiver}
      zoomFrom={1.1}
      zoomTo={1.2}
      dark={0.35}
    />
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Caption text="别硬撑" size={48} delay={0} color={MUTED_SAFE} />
      <div style={{ height: 12 }} />
      <Caption text="三句就能救场" size={64} delay={8} color={GOLD} />
    </AbsoluteFill>
  </AbsoluteFill>
);

const SetupBeat: React.FC<{
  src: string;
  line: string;
  accent: string;
}> = ({ src, line, accent }) => (
  <AbsoluteFill>
    <PhotoPlate src={src} zoomFrom={1.08} zoomTo={1.14} dark={0.25} />
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 320,
      }}
    >
      <Caption text={line} size={52} delay={2} color={accent} />
    </AbsoluteFill>
  </AbsoluteFill>
);

const DialogueBeat: React.FC<{
  src: string;
  en: string;
  zh: string;
  accent: string;
  zhAt: number;
  n: number;
}> = ({ src, en, zh, accent, zhAt, n }) => (
  <AbsoluteFill>
    <PhotoPlate src={src} zoomFrom={1.06} zoomTo={1.14} dark={0.32} />
    <TopTag text={`救场句 ${n}/3`} color={accent} />
    <SpeechBubble en={en} zh={zh} accent={accent} zhAt={zhAt} />
  </AbsoluteFill>
);

const Payoff: React.FC = () => (
  <AbsoluteFill>
    <PhotoPlate src={STILLS.relief} zoomFrom={1.05} zoomTo={1.14} dark={0.25} />
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 300,
      }}
    >
      <Caption text="听懂了" size={60} delay={0} />
      <div style={{ height: 8 }} />
      <Caption text="就不丢人" size={72} delay={8} color={TEAL} />
    </AbsoluteFill>
  </AbsoluteFill>
);

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 20, [0, 10, 20], [1, 1.05, 1], clamp);
  return (
    <AbsoluteFill>
      <PhotoPlate
        src={STILLS.relief}
        zoomFrom={1.12}
        zoomTo={1.18}
        dark={0.4}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ scale: pulse }}>
          <Caption text="主页跟读" size={76} delay={0} />
        </div>
        <div style={{ height: 16 }} />
        <Caption text="chinapte.net" size={40} delay={6} color={GOLD} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const CareThreeLinesV3: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <AudioTracks mixFile="audio/v3/care-v3-mix.m4a" />
      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.dur}>
        <Hook />
      </Sequence>
      <Sequence
        from={SCENES.humiliate.from}
        durationInFrames={SCENES.humiliate.dur}
      >
        <Humiliate />
      </Sequence>
      <Sequence from={SCENES.bridge.from} durationInFrames={SCENES.bridge.dur}>
        <Bridge />
      </Sequence>
      <Sequence from={SCENES.setup1.from} durationInFrames={SCENES.setup1.dur}>
        <SetupBeat src={STILLS.situp} line="她想坐起来——" accent={CARE} />
      </Sequence>
      <Sequence from={SCENES.beat1.from} durationInFrames={SCENES.beat1.dur}>
        <DialogueBeat
          src={STILLS.situp}
          en="I'll help you sit up."
          zh="帮您坐起来"
          accent={CARE}
          zhAt={ZH1_AT}
          n={1}
        />
      </Sequence>
      <Sequence from={SCENES.setup2.from} durationInFrames={SCENES.setup2.dur}>
        <SetupBeat src={STILLS.pain} line="她皱眉了——" accent={TEAL} />
      </Sequence>
      <Sequence from={SCENES.beat2.from} durationInFrames={SCENES.beat2.dur}>
        <DialogueBeat
          src={STILLS.pain}
          en="Are you in pain?"
          zh="您疼吗？"
          accent={TEAL}
          zhAt={ZH2_AT}
          n={2}
        />
      </Sequence>
      <Sequence from={SCENES.setup3.from} durationInFrames={SCENES.setup3.dur}>
        <SetupBeat src={STILLS.callbell} line="她要找人——" accent={BLUE} />
      </Sequence>
      <Sequence from={SCENES.beat3.from} durationInFrames={SCENES.beat3.dur}>
        <DialogueBeat
          src={STILLS.callbell}
          en="Please use the call bell."
          zh="请按呼叫铃"
          accent={BLUE}
          zhAt={ZH3_AT}
          n={3}
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
