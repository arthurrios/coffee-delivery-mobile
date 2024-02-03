import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { Remove } from './Remove'
import { InputNumber } from './InputNumber'

export interface Props {
  data: CoffeeDTO
}

export function CartItem({ data }: Props) {
  const [quantity, setQuantity] = useState(1)

  function handleQuantityChange(newQuantity: number) {
    setQuantity(newQuantity)
  }

  if (data) {
    return (
      <HStack
        w="$full"
        h={117}
        gap="$5"
        px="$8"
        py="$4"
        bgColor="$gray_900"
        borderBottomColor="$gray_700"
        borderBottomWidth={1}
        alignItems="center"
      >
        <Image source={data.image} alt="Coffee Image" h="$16" w="$16" />
        <VStack gap="$2" flex={1}>
          <HStack gap={9} alignItems="flex-start">
            <VStack gap={2} flex={1}>
              <Text color="$gray_100">{data.name}</Text>
              <Text color="$gray_400" fontSize="$sm">
                227ml
              </Text>
            </VStack>
            <Text
              color="$gray_200"
              fontFamily="$heading"
              fontSize="$sm"
              lineHeight={20}
              bottom={-3}
            >
              $ 13.50
            </Text>
          </HStack>
          <HStack gap="$2">
            <InputNumber
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
            <Remove />
          </HStack>
        </VStack>
      </HStack>
    )
  }
}
