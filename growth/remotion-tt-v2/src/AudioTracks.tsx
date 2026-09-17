import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";

/**
 * Default audio bed for chinaPTE TikTok renders.
 * Silent exports are a BUG — always include VO + light BGM.
 * VO is primary; BGM is quiet (~-18dB relative in pre-mixed assets,
 * or volume={0.12} when layering raw tracks).
 */
export const AudioTracks: React.FC<{
  /** Pre-mixed VO+BGM (preferred) under public/audio/ */
  mixFile?: string;
  /** Or separate VO + BGM files */
  voFile?: string;
  bgmFile?: string;
  /** BGM volume when layering raw (default ~-18dB ≈ 0.126) */
  bgmVolume?: number;
}> = ({ mixFile, voFile, bgmFile, bgmVolume = 0.12 }) => {
  if (mixFile) {
    return (
      <AbsoluteFill>
        <Audio src={staticFile(mixFile)} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      {voFile ? <Audio src={staticFile(voFile)} volume={1} /> : null}
      {bgmFile ? (
        <Audio src={staticFile(bgmFile)} volume={bgmVolume} />
      ) : null}
    </AbsoluteFill>
  );
};
