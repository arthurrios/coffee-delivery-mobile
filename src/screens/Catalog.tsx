import { HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed'
import CoffeeGrains from '@assets/coffee-grains.png'
import { MapPin, ShoppingCart } from 'phosphor-react-native'
import { RootInput } from '@components/Input'

export function Catalog() {
  return (
    <VStack flex={1}>
      <VStack h={384} bgColor="$gray_100">
        <Image
          position="absolute"
          right="$2"
          bottom={68}
          source={CoffeeGrains}
          alt="coffee-grains"
        />
        <HStack
          mt="$12"
          justifyContent="space-between"
          alignItems="center"
          py="$4"
          px="$8"
        >
          <HStack alignItems="center" gap="$1">
            <MapPin size={20} weight="fill" color="#8047F8" />
            <Text fontFamily="$body" fontSize="$sm" color="$gray_900">
              Brasília, DF
            </Text>
          </HStack>
          <Pressable h="$8" w="$8" alignItems="center" justifyContent="center">
            <ShoppingCart size={20} weight="fill" color="#C47F17" />
          </Pressable>
        </HStack>
        <VStack mt="$5" px="$8" gap="$4">
          <Text
            color="$white"
            fontFamily="$heading"
            fontSize="$xl"
            lineHeight="$lg"
          >
            Find the perfect coffee for every occasion
          </Text>
          <RootInput placeholder="Search" />
        </VStack>
      </VStack>
    </VStack>
  )
}
