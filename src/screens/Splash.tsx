import { HStack, View } from '@gluestack-ui/themed'
import TypeLogo from '@assets/type.svg'
import VectorLogo from '@assets/vector.svg'

export function Splash() {
  return (
    <View flex={1} bgColor="$purple">
      <HStack
        w="$full"
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$4"
      >
        <VectorLogo />
        <TypeLogo />
      </HStack>
    </View>
  )
}
