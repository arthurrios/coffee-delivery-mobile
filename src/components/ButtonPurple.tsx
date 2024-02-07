import { Button, Text } from '@gluestack-ui/themed'
import { useState } from 'react'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  title: string
  isDisabled?: boolean
}

export function ButtonPurple({ title, isDisabled = false, ...props }: Props) {
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
      bgColor={
        isDisabled ? '$purple_dark' : isFocused ? '$purple' : '$purple_dark'
      }
      rounded="$md"
      opacity={isDisabled ? 0.3 : 1}
      h={46}
      px="$2"
      py="$3"
      alignItems="center"
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
