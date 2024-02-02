import { Pressable, Text } from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  title: string
  isSelected?: boolean
}

export function Label({ title, isSelected = false, ...props }: Props) {
  return (
    <Pressable
      {...props}
      alignItems="center"
      justifyContent="center"
      px="$3"
      py={6}
      rounded="$md"
      bgColor={isSelected ? 'transparent' : '$gray_700'}
      borderWidth={isSelected ? 1 : 0}
      borderColor="$purple"
      flex={1}
    >
      <Text
        color={!isSelected ? '$gray_300' : '$purple'}
        fontFamily={isSelected ? '$mono' : '$body'}
        fontSize="$sm"
        fontWeight="$bold"
      >
        {title}
      </Text>
    </Pressable>
  )
}
