import { Button, Text } from '@gluestack-ui/themed'
import { useState } from 'react'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  title: string
}

export function ButtonYellow({ title, ...props }: Props) {
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
      bgColor={isFocused ? '$yellow' : '$yellow_dark'}
      rounded="$md"
      h={46}
      px="$2"
      py="$3"
      // flex={1}
      {...props}
    >
      <Text
        color="$white"
        fontFamily="$mono"
        textTransform="uppercase"
        fontSize="$sm"
      >
        {title}
      </Text>
    </Button>
  )
}
