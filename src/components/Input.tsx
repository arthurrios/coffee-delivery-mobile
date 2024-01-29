import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed'
import { MagnifyingGlass } from 'phosphor-react-native'

type Props = {
  placeholder: string
}

export function RootInput({ placeholder, ...props }: Props) {
  return (
    <Input
      borderRadius="$md"
      p="$3"
      {...props}
      borderWidth={0}
      bgColor="$gray_200"
    >
      <InputSlot>
        <InputIcon as={MagnifyingGlass} color="$gray_400" />
      </InputSlot>
      <InputField
        fontFamily="$body"
        placeholder={placeholder}
        placeholderTextColor="$gray_400"
        color="#FFFFFF"
      />
    </Input>
  )
}
