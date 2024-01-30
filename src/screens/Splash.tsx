import { HStack, View } from '@gluestack-ui/themed'
import TypeLogo from '@assets/type.svg'
import VectorLogo from '@assets/vector.svg'
import { StatusBar } from 'expo-status-bar'

export function Splash() {
  return (
    <View flex={1} bgColor="$purple">
      <StatusBar style="light" />
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
