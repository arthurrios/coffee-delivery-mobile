import { Pressable, Text, View } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/index'
import { storageProductGetAll } from '@storage/storageCart'
import { ShoppingCart } from 'phosphor-react-native'
import { PressableProps } from 'react-native'

type Props = PressableProps

export function Cart({ ...props }: Props) {
  const { navigate } = useNavigation<AppNavigationRoutesProps>()
  const { length } = storageProductGetAll()

  return (
    <Pressable
      position="relative"
      h="$8"
      w="$8"
      alignItems="center"
      justifyContent="center"
      onPress={() => navigate('cart')}
      {...props}
    >
      <ShoppingCart
        size={20}
        weight="fill"
        color={length !== 0 ? '#8047F8' : '#C47F17'}
      />
      {length !== 0 && (
        <View
          position="absolute"
          top={-10}
          right={-10}
          h="$5"
          w="$5"
          bgColor="$purple"
          rounded="$full"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontFamily="$body" color="$white" fontSize="$xs">
            {length}
          </Text>
        </View>
      )}
    </Pressable>
  )
}
