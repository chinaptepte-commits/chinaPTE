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
    </>
  );
};
