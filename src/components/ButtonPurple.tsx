import { Button, Text } from '@gluestack-ui/themed'
import { useState } from 'react'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  title: string
  isDisabled: boolean
}

export function ButtonPurple({ title, isDisabled, ...props }: Props) {
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
      bgColor={isFocused ? '$purple' : '$purple_dark'}
      rounded="$md"
      isDisabled={isDisabled}
      flex={1}
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
