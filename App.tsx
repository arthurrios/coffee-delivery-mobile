import {  GluestackUIProvider, Text, View } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import { Baloo2_700Bold, useFonts } from '@expo-google-fonts/baloo-2'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <GluestackUIProvider config={config}>
      <View flex={1} alignItems='center' justifyContent='center'>
        <Text color='$red_dark' fontFamily='$heading' fontSize='$2xl' lineHeight='$2xl'>Hello Gluestack!</Text>
      </View>
    </GluestackUIProvider>
  );
}
