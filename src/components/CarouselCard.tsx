import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { HStack, Pressable, Text, View } from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

type Props = PressableProps & {
  data: CoffeeDTO
  index: number
  scrollX: SharedValue<number>
}

export function CarouselCard({ data, index, scrollX, ...props }: Props) {
  const inputRange = [(index - 1) * 176, index * 176, (index + 1) * 176]

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  })

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            inputRange,
            [0.53, 1, 0.53],
            Extrapolation.CLAMP,
          ),
        },
      ],
      top: interpolate(
        scrollX.value,
        inputRange,
        [-40, -34, -40],
        Extrapolation.CLAMP,
      ),
    }
  })

  const innerViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(
        scrollX.value,
        inputRange,
        [64, 80, 64],
        Extrapolation.CLAMP,
      ),
    }
  })
  if (data) {
    return (
      <Animated.View style={containerAnimatedStyle}>
        <Pressable
          alignItems="center"
          w={208}
          px="$4"
          py="$5"
          gap={14}
          bgColor="$gray_800"
          borderTopLeftRadius={6}
          borderBottomRightRadius={6}
          borderTopRightRadius={36}
          borderBottomLeftRadius={36}
          borderWidth={1}
          borderColor="$gray_700"
          shadowColor="$black"
          shadowRadius={8}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.05}
          {...props}
        >
          <Animated.Image
            source={data.image}
            style={[
              {
                height: 120,
                width: 120,
                position: 'absolute',
              },
              imageAnimatedStyle,
            ]}
          />
          <Animated.View
            style={[{ alignItems: 'center', gap: 14 }, innerViewAnimatedStyle]}
          >
            <View bgColor="$purple_light" px="$2" py="$1" rounded="$full">
              <Text
                textTransform="uppercase"
                fontFamily="$mono"
                fontWeight="$bold"
                fontSize="$2xs"
                color="$purple"
                lineHeight={13}
              >
                {data.category}
              </Text>
            </View>
            <View gap="$1">
              <Text
                fontFamily="$heading"
                fontSize="$xl"
                lineHeight="$xl"
                color="$gray_200"
                textAlign="center"
              >
                {data.name}
              </Text>
              <Text
                textAlign="center"
                fontSize="$xs"
                fontFamily="$body"
                color="$gray_400"
                lineHeight="$2xs"
                numberOfLines={2}
              >
                {data.description}
              </Text>
            </View>
            <HStack alignItems="baseline" gap={6}>
              <Text
                position="absolute"
                left={-15}
                bottom={8}
                fontFamily="$body"
                color="$yellow_dark"
                fontSize="$sm"
              >
                $
              </Text>
              <Text
                fontFamily="$heading"
                color="$yellow_dark"
                fontSize="$2xl"
                lineHeight={0}
              >
                {data.price.toFixed(2)}
              </Text>
            </HStack>
          </Animated.View>
        </Pressable>
      </Animated.View>
    )
  }
}
