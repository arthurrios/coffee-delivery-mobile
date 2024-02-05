import { HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'
import { Remove } from './Remove'
import { InputNumber } from './InputNumber'
import { StorageCartProps } from '@storage/storageCart'
import { useCart } from '@hooks/useCart'

export interface Props {
  data: StorageCartProps
  onQuantityChange: (itemId: string, newQuantity: number) => void
}

export function CartItem({ data, onQuantityChange }: Props) {
  const [quantity, setQuantity] = useState(data.quantity)
  const [itemTotal, setItemTotal] = useState(data.quantity * data.price)

  const { removeProductCart } = useCart()

  function handleQuantityChange(newQuantity: number) {
    const newTotal = newQuantity * data.price
    setQuantity(newQuantity)
    setItemTotal(newTotal)
    onQuantityChange(data.id, newQuantity)
  }

  function handleRemove() {
    removeProductCart(data.id)
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
                {data.size}
              </Text>
            </VStack>
            <Text
              color="$gray_200"
              fontFamily="$heading"
              fontSize="$sm"
              lineHeight={20}
              bottom={-3}
            >
              $ {itemTotal.toFixed(2)}
            </Text>
          </HStack>
          <HStack gap="$2">
            <InputNumber
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              itemId={data.id}
            />
            <Remove onPress={() => handleRemove()} />
          </HStack>
        </VStack>
      </HStack>
    )
  }
}
