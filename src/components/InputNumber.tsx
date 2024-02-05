import { HStack, Text } from '@gluestack-ui/themed'
import { Icon } from './Icon'
import {
  storageDecreaseItemQuantity,
  storageIncreaseItemQuantity,
} from '@storage/storageCart'

type Props = {
  itemId: string
  quantity: number
  onQuantityChange: (newQuantity: number) => void
}

export function InputNumber({ quantity, onQuantityChange, itemId }: Props) {
  function handleIncreaseQuantity() {
    const newQuantity = quantity + 1
    onQuantityChange(newQuantity)

    storageIncreaseItemQuantity(itemId)
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      onQuantityChange(newQuantity)

      storageDecreaseItemQuantity(itemId)
    }
  }
  return (
    <HStack
      alignItems="center"
      rounded="$md"
      borderWidth={1}
      borderColor="$gray_600"
      h="$9"
      gap="$1"
    >
      <Icon type="minus" onPress={() => handleDecreaseQuantity()} />
      <Text color="$gray_100">{quantity}</Text>
      <Icon type="plus" onPress={() => handleIncreaseQuantity()} />
    </HStack>
  )
}
