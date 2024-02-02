import { Button } from '@gluestack-ui/themed'
import { Minus, Plus } from 'phosphor-react-native'
import { useState } from 'react'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  type: string
}

export function Icon({ type, ...props }: Props) {
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
      bgColor={isFocused ? '$gray_700' : 'transparent'}
      rounded="$md"
      h="$9"
      w="$9"
      {...props}
    >
      {type === 'plus' ? (
        <Plus
          size={20}
          weight="bold"
          color={isFocused ? '#4B2995' : '#8047F8'}
        />
      ) : (
        <Minus
          size={20}
          weight="bold"
          color={isFocused ? '#4B2995' : '#8047F8'}
        />
      )}
    </Button>
  )
}
