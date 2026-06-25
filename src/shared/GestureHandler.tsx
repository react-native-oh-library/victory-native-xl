import {
  type ComposedGesture,
  GestureDetector,
  type GestureType,
} from "react-native-gesture-handler";
import { type SkRect } from "@shopify/react-native-skia";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import * as React from "react";
import { type ChartTransformState } from "victory-native/src/cartesian/hooks/useChartTransformState";
import type { GestureHandlerConfig } from "victory-native/src/types";

type GestureHandlerProps = {
  gesture: ComposedGesture | GestureType;
  dimensions?: SkRect;
  transformState?: ChartTransformState;
  debug?: boolean;
  config?: GestureHandlerConfig;
};

/**
 * OHOS: Keep the gesture overlay fixed to the chart container instead of
 * following transformState.matrix. Upstream 41.20.2 moves the overlay with
 * matrix transforms, which breaks pan/pinch on HarmonyOS RNGH (e.g. Y pan
 * requires a horizontal move first). Aligns with upstream main PR #664.
 */
export const GestureHandler = ({
  gesture,
  debug = false,
  config,
}: GestureHandlerProps) => {
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: debug ? "rgba(100, 200, 255, 0.4)" : "transparent",
  }));

  return (
    <GestureDetector {...config} gesture={gesture}>
      <Animated.View style={style} />
    </GestureDetector>
  );
};
