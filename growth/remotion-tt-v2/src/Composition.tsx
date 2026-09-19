import { Composition } from "remotion";
import {
  NzInduction,
  DURATION as NZ_DURATION,
  FPS as NZ_FPS,
} from "./NzInduction";
import {
  RsThreeSecond,
  DURATION as RS_DURATION,
  FPS as RS_FPS,
} from "./RsThreeSecond";
import {
  CareThreeLines,
  DURATION as CARE_DURATION,
  FPS as CARE_FPS,
} from "./CareThreeLines";
import {
  CareThreeLinesV2,
  DURATION as CARE_V2_DURATION,
  FPS as CARE_V2_FPS,
} from "./CareThreeLinesV2";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="NzInduction"
        component={NzInduction}
        durationInFrames={NZ_DURATION}
        fps={NZ_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="RsThreeSecond"
        component={RsThreeSecond}
        durationInFrames={RS_DURATION}
        fps={RS_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="CareThreeLines"
        component={CareThreeLines}
        durationInFrames={CARE_DURATION}
        fps={CARE_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="CareThreeLinesV2"
        component={CareThreeLinesV2}
        durationInFrames={CARE_V2_DURATION}
        fps={CARE_V2_FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
