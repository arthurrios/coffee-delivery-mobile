import { Image, View } from '@gluestack-ui/themed'
import Coffee from '@assets/product_coffee.png'
import Smoke from '@assets/smokes/smoke_3.svg'

export function CoffeeIllustration() {
  return (
    <View position="absolute" w="$full" h={260} alignItems="center">
      <Image
        position="absolute"
        bottom={-140}
        alt="Coffee Illustration"
        source={Coffee}
        resizeMode="cover"
        w={355}
        h={320}
      />
      <View position="absolute" bottom={100}>
        <Smoke />
      </View>
    </View>
  )
}
