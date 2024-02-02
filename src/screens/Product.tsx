import { ButtonPurple } from '@components/ButtonPurple'
import { Cart } from '@components/Cart'
import { CoffeeIllustration } from '@components/CoffeeIllustration'
import { Icon } from '@components/Icon'
import { Label } from '@components/Label'
import { ReturnButton } from '@components/ReturnButton'
import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'

export function Product() {
  const [size, setSize] = useState<string[]>([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [quantity, setQuantity] = useState(1)

  function handleSize(selectedSize: string) {
    const categoryAlreadySelected = size.includes(selectedSize)

    if (categoryAlreadySelected) {
      setSize([])
    } else {
      setSize([selectedSize])
    }
  }

  function handleIncreaseQuantity() {
    setQuantity((prevState) => prevState + 1)
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1)
    }
  }

  useEffect(() => {
    if (size.length !== 0) {
      setIsDisabled(false)
    } else if (size) {
      setIsDisabled(true)
    }
  }, [size])

  return (
    <VStack flex={1}>
      <StatusBar style="light" />
      <VStack h={590} bgColor="$gray_100" px="$8" pt="$16">
        <HStack justifyContent="space-between" alignItems="center" pb="$5">
          <ReturnButton theme="light" />
          <Cart />
        </HStack>
        <VStack gap="$5" mt="$3">
          <HStack justifyContent="space-between" alignItems="flex-end">
            <VStack gap="$3">
              <View bgColor="$gray_200" py="$1.5" px="$3" rounded="$full">
                <Text
                  color="$white"
                  fontFamily="$mono"
                  textTransform="uppercase"
                  fontSize="$2xs"
                  lineHeight={13}
                >
                  special
                </Text>
              </View>
              <Text
                fontFamily="$heading"
                color="$white"
                fontSize="$xl"
                lineHeight={26}
                pt="$2"
              >
                Irish
              </Text>
            </VStack>
            <HStack alignItems="flex-end" mb={-10}>
              <Text
                position="absolute"
                left={-16}
                bottom={14}
                fontFamily="$body"
                color="$yellow"
                fontSize="$sm"
              >
                $
              </Text>
              <Text
                fontFamily="$heading"
                color="$yellow"
                fontSize="$4xl"
                lineHeight={0}
              >
                3.50
              </Text>
            </HStack>
          </HStack>
          <Text color="$gray_500" fontFamily="$body">
            Drink made with coffee, Irish whiskey, sugar, and whipped cream
          </Text>
        </VStack>
      </VStack>
      <View position="absolute" zIndex={20} left={0} right={0} top="30%">
        <CoffeeIllustration />
      </View>
      <VStack flex={1} w="$full" bgColor="$gray_900" gap="$5" pt={42} px="$8">
        <VStack gap="$2">
          <Text fontSize="$sm" color="$gray_400">
            Select size:
          </Text>
          <HStack gap="$2">
            <Label
              title="114ml"
              isSelected={size.includes('114ml')}
              onPress={() => handleSize('114ml')}
            />
            <Label
              title="140ml"
              isSelected={size.includes('140ml')}
              onPress={() => handleSize('140ml')}
            />
            <Label
              title="227ml"
              isSelected={size.includes('227ml')}
              onPress={() => handleSize('227ml')}
            />
          </HStack>
        </VStack>
        <HStack w="$full" bgColor="$gray_700" p="$2" rounded="$md" gap="$4">
          <HStack alignItems="center" gap="$1">
            <Icon type="minus" onPress={() => handleDecreaseQuantity()} />
            <Text color="$gray_100">{quantity}</Text>
            <Icon type="plus" onPress={() => handleIncreaseQuantity()} />
          </HStack>
          <ButtonPurple title="add" isDisabled={isDisabled} />
        </HStack>
      </VStack>
    </VStack>
  )
}
