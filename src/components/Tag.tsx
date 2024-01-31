import { Pressable, Text } from '@gluestack-ui/themed'
import { PressableProps } from 'react-native'

type Props = PressableProps & {
  title: string
  isSelected?: boolean
}

export function Tag({ title, isSelected = false, ...props }: Props) {
  return (
    <Pressable
      {...props}
      alignItems="center"
      px="$3"
      py={6}
      rounded="$full"
      bgColor={!isSelected ? 'transparent' : '$purple'}
      borderWidth={!isSelected ? 1 : 0}
      borderColor="$purple"
    >
      <Text
        color={!isSelected ? '$purple_dark' : '$white'}
        fontFamily="$mono"
        fontSize="$2xs"
        textTransform="uppercase"
        fontWeight="$bold"
      >
        {title}
      </Text>
    </Pressable>
  )
}
