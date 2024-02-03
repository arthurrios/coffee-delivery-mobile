import { Button } from '@gluestack-ui/themed'
import { Trash } from 'phosphor-react-native'
import { useState } from 'react'
import { PressableProps } from 'react-native'

type Props = PressableProps

export function Remove({ ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false)

  function handlePressIn() {
    setIsFocused(true)
  }

  function handlePressOut() {
    setIsFocused(false)
  }

  return (
    <Button
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      isFocusVisible={isFocused}
      bgColor={isFocused ? '$gray_700' : '$gray_600'}
      rounded="$md"
      h="$9"
      w="$9"
      {...props}
    >
      <Trash size={20} color={isFocused ? '#8047F8' : '#4B2995'} />
    </Button>
  )
}
