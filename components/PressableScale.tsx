import type { PropsWithChildren } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type PressableScaleProps = PropsWithChildren<{
  onPress?: () => void;
  animateOpacity?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

const PressableScale: React.FC<PressableScaleProps> = ({
  children,
  onPress,
  animateOpacity = true,
  style,
}) => {
  const active = useSharedValue(false);

  const gesture = Gesture.Tap()
    .maxDuration(4000)
    .onTouchesDown(() => {
      active.value = true;
    })
    .onTouchesUp(() => {
      if (onPress != null) runOnJS(onPress)();
    })
    .onFinalize(() => {
      active.value = false;
    });

  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animateOpacity ? withTiming(active.value ? 0.8 : 1) : 1,
      transform: [
        {
          scale: withTiming(active.value ? 0.92 : 1),
        },
      ],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rAnimatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export { PressableScale };
