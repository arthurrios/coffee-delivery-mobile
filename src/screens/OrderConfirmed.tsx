import { Text, VStack } from '@gluestack-ui/themed'
import OrderSvg from '@assets/order_confirmed.svg'
import { ButtonPurple } from '@components/ButtonPurple'

export function OrderConfirmed() {
  return (
    <VStack
      flex={1}
      bgColor="$gray_900"
      pt={104}
      pb={175}
      px="$16"
      alignItems="center"
      justifyContent="center"
    >
      <OrderSvg />
      <Text
        fontFamily="$heading"
        fontSize="$2xl"
        lineHeight="$2xl"
        color="$yellow_dark"
        mt="$10"
      >
        Yay! Order confirmed
      </Text>
      <Text
        mt="$2"
        mb="$16"
        color="$gray_200"
        fontSize="$sm"
        textAlign="center"
      >
        Now just wait until your coffee is delivered!
      </Text>
      <ButtonPurple title="go to home" style={{ width: '100%' }} />
    </VStack>
  )
}
