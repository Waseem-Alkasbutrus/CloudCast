import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from './GlobalVars'

export function SafeAreaScreenWrapper({ children, colors = { Colors } }) {
  let grad = colors.Colors._z.gradient

  return (
    <LinearGradient colors={grad} style={styles.gradient}>
      <SafeAreaView style={styles.safeView}>{children}</SafeAreaView>
    </LinearGradient>
  )
}

export function ScreenWrapper({ children, colors = { Colors } }) {
  let grad = colors.Colors._z.gradient

  return (
    <LinearGradient colors={grad} style={styles.gradient}>
      <View style={styles.safeView}>{children}</View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flexGrow: 1,
  },
  safeView: {
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
})
