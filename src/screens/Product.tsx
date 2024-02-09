/* eslint-disable no-useless-catch */
import { ButtonPurple } from '@components/ButtonPurple'
import { Cart } from '@components/Cart'
import { CoffeeIllustration } from '@components/CoffeeIllustration'
import { Icon } from '@components/Icon'
import { Label } from '@components/Label'
import { ReturnButton } from '@components/ReturnButton'
import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { useCart } from '@hooks/useCart'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/index'
import { playSound } from '@utils/playSound'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

export function Product() {
  const [size, setSize] = useState<string[]>([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isDisabledAndPressed, setIsDisabledAndPressed] = useState(0)

  const navigation = useNavigation<AppNavigationRoutesProps>()

  const route = useRoute()
  const product = route.params as CoffeeDTO

  const { addProductCart } = useCart()

  const textColor = useSharedValue(0)

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: textColor.value ? '#E8BAAB' : '#8D8686',
    }
  })

  function handleGoBack() {
    navigation.goBack()
  }

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

  async function handleAddProductToCart() {
    try {
      if (isDisabled) {
        setIsDisabledAndPressed(1)
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        return
      }

      await addProductCart({
        id: product.id,
        name: product.name,
        image: product.image,
        quantity,
        size: size[0],
        price: product.price,
      })

      playSound()

      navigation.navigate('catalog', {
        name: product.name,
        size: size[0],
        quantity,
      })
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (size.length !== 0) {
      setIsDisabled(false)
    } else if (size) {
      setIsDisabled(true)
    }
  }, [size])

  useEffect(() => {
    if (isDisabledAndPressed) {
      textColor.value = withSequence(
        withTiming(1),
        withDelay(1000, withTiming(0)),
      )
      const timeout = setTimeout(() => {
        setIsDisabledAndPressed(0)
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }, [isDisabledAndPressed])

  useEffect(() => {
    if (size.length !== 0) {
      textColor.value = 0
    }
  }, [size])

  return (
    <VStack flex={1}>
      <StatusBar style="light" />
      <VStack h={590} bgColor="$gray_100" px="$8" pt="$16">
        <HStack justifyContent="space-between" alignItems="center" pb="$5">
          <ReturnButton theme="light" onPress={() => handleGoBack()} />
          <Cart />
        </HStack>
        <VStack gap="$5" mt="$3">
          <HStack justifyContent="space-between" alignItems="flex-end">
            <VStack gap="$3">
              <HStack>
                <View
                  bgColor="$gray_200"
                  py="$1.5"
                  px="$3"
                  rounded="$full"
                  alignItems="center"
                >
                  <Text
                    color="$white"
                    fontFamily="$mono"
                    textTransform="uppercase"
                    fontSize="$2xs"
                    lineHeight={13}
                  >
                    {product.category}
                  </Text>
                </View>
              </HStack>
              <Text
                fontFamily="$heading"
                color="$white"
                fontSize="$xl"
                lineHeight={26}
                pt="$2"
              >
                {product.name}
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
                {product.price.toFixed(2)}
              </Text>
            </HStack>
          </HStack>
          <Text color="$gray_500" fontFamily="$body">
            {product.description}
          </Text>
        </VStack>
      </VStack>
      <View position="absolute" zIndex={20} left={0} right={0} top="30%">
        <CoffeeIllustration />
      </View>
      <VStack flex={1} w="$full" bgColor="$gray_900" gap="$5" pt={42} px="$8">
        <VStack gap="$2">
          <Animated.Text style={textAnimatedStyle}>Select size:</Animated.Text>
          <HStack gap="$2">
            <Label
              title="114ml"
              isSelected={size.includes('114ml')}
              onPress={() => handleSize('114ml')}
              reply={isDisabledAndPressed}
              sizeLength={size.length}
            />
            <Label
              title="140ml"
              isSelected={size.includes('140ml')}
              onPress={() => handleSize('140ml')}
              reply={isDisabledAndPressed}
              sizeLength={size.length}
            />
            <Label
              title="227ml"
              isSelected={size.includes('227ml')}
              onPress={() => handleSize('227ml')}
              reply={isDisabledAndPressed}
              sizeLength={size.length}
            />
          </HStack>
        </VStack>
        <HStack w="$full" bgColor="$gray_700" p="$2" rounded="$md" gap="$4">
          <HStack alignItems="center" gap="$1">
            <Icon type="minus" onPress={() => handleDecreaseQuantity()} />
            <Text color="$gray_100">{quantity}</Text>
            <Icon type="plus" onPress={() => handleIncreaseQuantity()} />
          </HStack>
          <ButtonPurple
            title="add"
            isDisabled={isDisabled}
            style={{ flex: 1 }}
            onPress={() => handleAddProductToCart()}
          />
        </HStack>
      </VStack>
    </VStack>
  )
}
