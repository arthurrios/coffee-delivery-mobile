import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  data: CoffeeDTO
}

export function CoffeeCard({ data }: Props) {
  if (data) {
    return (
      <Pressable
        flexDirection="row"
        mt="$8"
        px="$4"
        pt="$4"
        pb="$2"
        gap={14}
        h={120}
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
      >
        <Image
          source={data.image}
          alt="Coffee picture"
          h={96}
          w={96}
          mt={-36}
        />
        <VStack justifyContent="space-between" flex={1}>
          <VStack>
            <Text fontFamily="$heading" color="$gray_200">
              {data.name}
            </Text>
            <Text
              fontSize="$xs"
              fontFamily="$body"
              color="$gray_400"
              lineHeight="$xs"
              numberOfLines={2}
            >
              {data.description}
            </Text>
          </VStack>

          <HStack ml="$4" alignItems="baseline" gap={6}>
            <Text
              position="absolute"
              left={-15}
              bottom={6}
              fontFamily="$body"
              color="$yellow_dark"
              fontSize="$sm"
            >
              $
            </Text>
            <Text
              fontFamily="$heading"
              color="$yellow_dark"
              fontSize="$xl"
              lineHeight={0}
            >
              {data.price.toFixed(2)}
            </Text>
          </HStack>
        </VStack>
      </Pressable>
    )
  }
}
