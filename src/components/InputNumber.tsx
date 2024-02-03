import { HStack, Text } from '@gluestack-ui/themed'
import { Icon } from './Icon'

type Props = {
  quantity: number
  onQuantityChange: (newQuantity: number) => void
}

export function InputNumber({ quantity, onQuantityChange }: Props) {
  function handleIncreaseQuantity() {
    const newQuantity = quantity + 1
    onQuantityChange(newQuantity)
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      onQuantityChange(newQuantity)
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
