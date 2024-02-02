import { Pressable } from '@gluestack-ui/themed'
import { ArrowLeft } from 'phosphor-react-native'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  theme: string
}

export function ReturnButton({ theme, ...props }: Props) {
  const LIGHT = '#FFFFFF'
  const DARK = '#272221'

  return (
    <Pressable h="$6" w="$6" {...props}>
      <ArrowLeft color={theme === 'light' ? LIGHT : DARK} />
    </Pressable>
  )
}
