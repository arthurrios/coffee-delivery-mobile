import { Center, HStack, Pressable, Text, View } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/index'
import { ArrowRight, ShoppingCart } from 'phosphor-react-native'

export interface AddCoffeeToastProps {
  name: string
  size: string
  quantity: number
}

export function AddCoffeeToast({ name, size, quantity }: AddCoffeeToastProps) {
  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  return (
    <HStack
      w="$full"
      alignItems="center"
      bgColor="$white"
      h={96}
      gap="$5"
      justifyContent="space-between"
      px="$8"
      pt="$7"
      pb="$8"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: -2 }}
      shadowRadius="$4"
      shadowOpacity={0.08}
    >
      <HStack alignContent="center" gap="$5">
        <View position="relative" p="$2" bgColor="$gray_500" rounded="$md">
          <ShoppingCart weight="fill" color="#FFFFFF" size={20} />
          <Center
            position="absolute"
            top={-8}
            right={-8}
            bgColor="$purple"
            h="$5"
            w="$5"
            rounded="$full"
          >
            <Text color="$white" fontSize="$xs">
              1
            </Text>
          </Center>
        </View>
        <HStack w={180} flexWrap="wrap" bottom={5}>
          <Text fontSize="$sm" flex={1} color="$gray_400">
            {quantity}{' '}
            <Text flex={1} fontSize="$sm" color="$gray_400" fontFamily="$mono">
              {name}{' '}
            </Text>
            {quantity > 1 ? 'coffees of ' : 'coffee of '}
            <Text fontSize="$sm" color="$gray_400" fontFamily="$mono" flex={1}>
              {size}{' '}
            </Text>
            added to cart
          </Text>
        </HStack>
      </HStack>
      <Pressable
        h="$9"
        justifyContent="center"
        onPress={() => navigate('cart')}
      >
        <HStack gap="$1" alignItems="center">
          <Text
            textTransform="uppercase"
            fontFamily="$mono"
            fontSize="$xs"
            color="$purple"
          >
            see
          </Text>
          <ArrowRight size={16} />
        </HStack>
      </Pressable>
    </HStack>
  )
}
