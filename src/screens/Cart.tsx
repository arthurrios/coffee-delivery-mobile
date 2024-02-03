import { ButtonYellow } from '@components/ButtonYellow'
import { CartItem } from '@components/CartItem'
import { ReturnButton } from '@components/ReturnButton'
import { getCoffees } from '@data/coffees'
import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

export function Cart() {
  const [cartItems, setCartItems] = useState<CoffeeDTO[]>()

  async function fetchData() {
    const data = await getCoffees()
    setCartItems([data[0], data[1], data[2], data[3], data[4], data[5]])
  }

  useEffect(() => {
    fetchData()
  }, [])

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
        <ReturnButton theme="dark" />
        <Text fontFamily="$heading" fontSize="$sm" color="$gray_200">
          Cart
        </Text>
        <View h="$6" w="$6" />
      </HStack>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem data={item} />}
        showsVerticalScrollIndicator={false}
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
            $ 13.50
          </Text>
        </HStack>
        <ButtonYellow title="confirm order" />
      </VStack>
    </VStack>
  )
}
