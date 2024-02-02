import { Pressable } from '@gluestack-ui/themed'
import { ShoppingCart } from 'phosphor-react-native'
import { PressableProps } from 'react-native'

type Props = PressableProps

export function Cart({ ...props }: Props) {
  return (
    <Pressable
      h="$8"
      w="$8"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <ShoppingCart size={20} weight="fill" color="#C47F17" />
    </Pressable>
  )
}
