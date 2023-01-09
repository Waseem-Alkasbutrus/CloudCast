import react from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './src/navigation/BottomTabs'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar, View } from 'react-native'
import { Colors } from './src/components/GlobalVars'

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

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={Colors._z.gradient[0]}
        barStyle={'light-content'}
      />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <BottomTabs></BottomTabs>
      </View>
    </NavigationContainer>
  )
}
