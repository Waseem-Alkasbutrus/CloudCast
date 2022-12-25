import react from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './src/navigation/BottomTabs'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import Font from './src/components/Font'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk: require('./assets/fonts/SpaceGrotesk-VariableFont_wght.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  console.log(fontsLoaded)

  return (
    <NavigationContainer>
      <View style={{flex: 1}} onLayout={onLayoutRootView}>
        <BottomTabs></BottomTabs>
      </View>
    </NavigationContainer>
  )
}
