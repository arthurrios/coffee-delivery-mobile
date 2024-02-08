import { CoffeeDTO } from '@dtos/CoffeeDTO'
import { Box } from '@gluestack-ui/themed'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Cart } from '@screens/Cart'
import { Catalog } from '@screens/Catalog'
import { OrderConfirmed } from '@screens/OrderConfirmed'
import { Product } from '@screens/Product'
import { Splash } from '@screens/Splash'

type AppRoutes = {
  catalog: { name?: string; size?: string; quantity?: number }
  splash: undefined
  product: CoffeeDTO
  cart: undefined
  orderConfirmed: undefined
}

export type AppNavigationRoutesProps = StackNavigationProp<AppRoutes>

const { Navigator, Screen } = createStackNavigator()

export function Routes() {
  return (
    <Box flex={1} bgColor="$gray_900">
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="splash" component={Splash} />
          <Screen name="catalog" component={Catalog} />
          <Screen name="product" component={Product} />
          <Screen name="cart" component={Cart} />
          <Screen name="orderConfirmed" component={OrderConfirmed} />
        </Navigator>
      </NavigationContainer>
    </Box>
  )
}
