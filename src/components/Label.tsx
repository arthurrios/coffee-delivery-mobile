import { Pressable } from '@gluestack-ui/themed'
import { useEffect } from 'react'
import { PressableProps } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const REPLY = ['transparent', '#E8BAAB']

type Props = PressableProps & {
  title: string
  isSelected?: boolean
  reply: number
  sizeLength: number
}

export function Label({
  title,
  isSelected = false,
  reply,
  sizeLength,
  ...props
}: Props) {
  const checked = useSharedValue(0)
  const opacity = useSharedValue(0)
  const color = REPLY[reply]

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['#EDEDED', 'transparent'],
      ),
      borderColor: interpolateColor(
        checked.value,
        [0, 1],
        ['#EDEDED', '#8047F8'],
      ),
    }
  })

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: 14,
      fontFamily: isSelected ? 'Roboto_700Bold' : 'Roboto_400Regular',
      color: interpolateColor(checked.value, [0, 1], ['#574F4D', '#8047F8']),
    }
  })

  const outerContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    checked.value = withTiming(isSelected ? 1 : 0)
  }, [isSelected])

  useEffect(() => {
    opacity.value = withSequence(withTiming(1), withDelay(1000, withTiming(0)))
  }, [reply])

  useEffect(() => {
    if (sizeLength !== 0) {
      opacity.value = 0
    }
  }, [sizeLength])

  return (
    <Pressable
      alignItems="center"
      justifyContent="center"
      rounded="$md"
      flex={1}
      w="$full"
      {...props}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 20,
            backgroundColor: 'transparent',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderWidth: 2,
            borderRadius: 6,
            borderColor: color,
            width: '100%',
            height: '100%',
            alignItems: 'center',
          },
          outerContainerAnimatedStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderWidth: 1,
            borderRadius: 6,
            width: '100%',
            alignItems: 'center',
          },
          containerAnimatedStyle,
        ]}
      >
        <Animated.Text style={textAnimatedStyle}>{title}</Animated.Text>
      </Animated.View>
    </Pressable>
  )
}
