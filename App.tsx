/* eslint-disable camelcase */
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from './config/gluestack-ui.config'
import { Baloo2_700Bold, useFonts } from '@expo-google-fonts/baloo-2'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Splash } from '@screens/Splash'
import { Catalog } from '@screens/Catalog'
import { Product } from '@screens/Product'
import { Loading } from '@components/Loading'
import { Cart } from '@screens/Cart'
import { OrderConfirmed } from '@screens/OrderConfirmed'

export default function App() {
  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GluestackUIProvider config={config}>
      {fontsLoaded ? <OrderConfirmed /> : <Loading />}
    </GluestackUIProvider>
  )
}
