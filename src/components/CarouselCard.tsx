import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { HStack, Image, Pressable, Text, View } from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  data: CoffeeDTO
}

export function CarouselCard({ data }: Props) {
  if (data) {
    return (
      <Pressable
        alignItems="center"
        w={208}
        pt="$24"
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
        shadowColor="rgba(0, 0, 0, 0.05)"
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 2 }}
      >
        <Image
          source={data.image}
          alt="Coffee picture"
          h={120}
          w={120}
          position="absolute"
          top={-34}
        />
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
      </Pressable>
    )
  }
}
