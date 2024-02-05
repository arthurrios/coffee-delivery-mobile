import { ButtonPurple } from '@components/ButtonPurple'
import { ButtonYellow } from '@components/ButtonYellow'
import { CartItem } from '@components/CartItem'
import { ReturnButton } from '@components/ReturnButton'
import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { useCart } from '@hooks/useCart'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/index'
import { ShoppingCart } from 'phosphor-react-native'
import { useEffect, useState } from 'react'

import { FlatList } from 'react-native'

export function Cart() {
  const { cart, updateProductQuantity } = useCart()

  const [orderTotal, setOrderTotal] = useState(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleQuantityChange(itemId: string, newQuantity: number) {
    updateProductQuantity(itemId, newQuantity)
  }

  useEffect(() => {
    const updatedOrderTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    setOrderTotal(updatedOrderTotal)
  }, [cart])

  return (
    <VStack flex={1} bgColor="$gray_900">
      <HStack
        mt="$11"
        px="$8"
        py={26}
        borderBottomColor="$gray_700"
        borderBottomWidth={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <ReturnButton theme="dark" onPress={() => navigation.goBack()} />
        <Text fontFamily="$heading" fontSize="$sm" color="$gray_200">
          Cart
        </Text>
        <View h="$6" w="$6" />
      </HStack>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem data={item} onQuantityChange={handleQuantityChange} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <VStack w="$full" h={260} gap="$8" p="$16" alignItems="center">
            <VStack gap="$3" alignItems="center">
              <ShoppingCart weight="fill" color="#D7D5D5" />
              <Text fontSize="$sm" color="$gray_400">
                Your cart is empty
              </Text>
            </VStack>
            <ButtonPurple
              onPress={() => navigation.goBack()}
              title="see catalog"
              style={{ width: '100%' }}
            />
          </VStack>
        )}
      />
      <VStack
        bgColor="$white"
        px="$8"
        pb="$10"
        pt="$7"
        gap="$5"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: -2 }}
        shadowRadius="$4"
        shadowOpacity={0.08}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Text color="$gray_200">Order total</Text>
          <Text
            color="$gray_200"
            fontFamily="$heading"
            fontSize="$xl"
            lineHeight={26}
            bottom={-3}
          >
            $ {orderTotal.toFixed(2)}
          </Text>
        </HStack>
        <ButtonYellow title="confirm order" />
      </VStack>
    </VStack>
  )
}
