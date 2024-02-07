import { HStack, View } from '@gluestack-ui/themed'
import TypeLogo from '@assets/type.svg'
import VectorLogo from '@assets/vector.svg'
import { StatusBar } from 'expo-status-bar'
import Animated, {
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/index'

const BG_COLOR_ANIMATION_TIME = 1500
const VECTOR_LOGO_ANIMATION_TIME = 1500

export function Splash() {
  const navigation = useNavigation<AppNavigationRoutesProps>()

  const bgColor = useSharedValue(0)
  const vectorLogoXPosition = useSharedValue(56)

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgColor.value,
        [0, 1],
        ['#4B2995', '#8047F8'],
      ),
    }
  })

  const vectorLogoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: vectorLogoXPosition.value,
        },
      ],
    }
  })

  useEffect(() => {
    bgColor.value = withTiming(1, { duration: BG_COLOR_ANIMATION_TIME })
    vectorLogoXPosition.value = withDelay(
      BG_COLOR_ANIMATION_TIME + 1500,
      withTiming(0, { duration: VECTOR_LOGO_ANIMATION_TIME }),
    )
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('catalog')
    }, 6000)

    return () => clearTimeout(timeout)
  }, [navigation])

  return (
    <Animated.View style={[{ flex: 1 }, containerAnimatedStyle]}>
      <StatusBar style="light" />
      <HStack
        w="$full"
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$4"
      >
        <Animated.View
          entering={FadeIn.duration(1000).delay(800)}
          style={[vectorLogoAnimatedStyle]}
        >
          <VectorLogo />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(800).delay(4000)}>
          <TypeLogo />
        </Animated.View>
      </HStack>
    </Animated.View>
  )
}
