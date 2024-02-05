/* eslint-disable camelcase */
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from './config/gluestack-ui.config'
import { Baloo2_700Bold, useFonts } from '@expo-google-fonts/baloo-2'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { Routes } from '@routes/index'
import { CartContextProvider } from '@contexts/CartContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <CartContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </CartContextProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  )
}
