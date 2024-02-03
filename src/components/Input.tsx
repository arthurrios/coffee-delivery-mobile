import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed'
import { MagnifyingGlass } from 'phosphor-react-native'
import { useState } from 'react'

type Props = {
  placeholder: string
}

export function RootInput({ placeholder, ...props }: Props) {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState('')

  const isFocusedAndTyped = isFocused && inputValue !== ''

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleInputChange = (text: string) => {
    setInputValue(text)
  }

  return (
    <Input
      borderRadius="$md"
      p="$3"
      {...props}
      borderWidth={0}
      bgColor="$gray_200"
    >
      <InputSlot>
        <InputIcon
          as={MagnifyingGlass}
          color={
            isFocusedAndTyped
              ? '$yellow_dark'
              : isFocused
                ? '$yellow'
                : '$gray_400'
          }
        />
      </InputSlot>
      <InputField
        fontFamily="$body"
        placeholder={placeholder}
        placeholderTextColor="$gray_400"
        color="#FFFFFF"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleInputChange}
        value={inputValue}
      />
    </Input>
  )
}
