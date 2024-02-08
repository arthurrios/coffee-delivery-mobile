import { Image, View } from '@gluestack-ui/themed'
import Coffee from '@assets/product_coffee.png'
import Smoke1 from '@assets/smokes/smoke_1.svg'
import Smoke2 from '@assets/smokes/smoke_2.svg'
import Smoke3 from '@assets/smokes/smoke_3.svg'
import Smoke4 from '@assets/smokes/smoke_4.svg'
// import Smoke5 from '@assets/smokes/smoke_5.svg'
// import Smoke6 from '@assets/smokes/smoke_6.svg'
// import Smoke7 from '@assets/smokes/smoke_7.svg'
// import Smoke8 from '@assets/smokes/smoke_8.svg'
// import Smoke9 from '@assets/smokes/smoke_9.svg'
// import Smoke10 from '@assets/smokes/smoke_10.svg'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useEffect, useState } from 'react'

const smokeComponents = [
  <Smoke1 key={1} />,
  <Smoke2 key={2} />,
  <Smoke3 key={3} />,
  <Smoke4 key={4} />,
  // <Smoke5 key={5} />,
  // <Smoke6 key={6} />,
  // <Smoke7 key={7} />,
  // <Smoke8 key={8} />,
  // <Smoke9 key={9} />,
  // <Smoke10 key={10} />,
]

export function CoffeeIllustration() {
  const [currentSmokeIndex, setCurrentSmokeIndex] = useState(0)
  const smokeOpacities = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSmokeIndex(
        (prevIndex) => (prevIndex + 1) % smokeComponents.length,
      )

      smokeOpacities.forEach((opacity, index) => {
        opacity.value = withTiming(index === currentSmokeIndex ? 1 : 0, {
          duration: 500,
          easing: Easing.linear,
        })
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentSmokeIndex])

  return (
    <View position="absolute" w="$full" h={260} alignItems="center">
      <Image
        position="absolute"
        bottom={-140}
        alt="Coffee Illustration"
        source={Coffee}
        resizeMode="cover"
        w={355}
        h={320}
      />
      <View
        position="absolute"
        top={30}
        alignItems="center"
        justifyContent="center"
      >
        {smokeComponents.map((Smoke, index) => (
          <Animated.View
            key={index}
            style={[
              { position: 'absolute', zIndex: 20 },
              useAnimatedStyle(() => ({
                opacity: smokeOpacities[index].value,
              })),
            ]}
          >
            {Smoke}
          </Animated.View>
        ))}
      </View>
    </View>
  )
}
