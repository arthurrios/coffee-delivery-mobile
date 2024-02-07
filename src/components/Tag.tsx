import { Pressable } from '@gluestack-ui/themed'
import { useEffect } from 'react'
import { PressableProps } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type Props = PressableProps & {
  title: string
  isSelected?: boolean
}

export function Tag({ title, isSelected = false, ...props }: Props) {
  const checked = useSharedValue(0)

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', '#8047F8'],
      ),
    }
  })

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(checked.value, [0, 1], ['#4B2995', '#FFFFFF']),
    }
  })

  useEffect(() => {
    checked.value = withTiming(isSelected ? 1 : 0)
  }, [isSelected])

  return (
    <Pressable
      alignItems="center"
      justifyContent="center"
      rounded="$full"
      {...props}
    >
      <Animated.View
        style={[
          {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderWidth: 1,
            borderRadius: 999,
            borderColor: '#8047F8',
          },
          containerAnimatedStyle,
        ]}
      >
        <Animated.Text
          style={[
            {
              fontFamily: 'Roboto_700Bold',
              fontSize: 10,
              textTransform: 'uppercase',
            },
            textAnimatedStyle,
          ]}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}
