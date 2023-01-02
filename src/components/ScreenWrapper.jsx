import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SafeAreaScreenWrapper({children, colors=['#FF7B7B', '#E35F9F']}) {
    return (
        <LinearGradient colors={colors} style={styles.gradient}>
            <SafeAreaView style={styles.safeView}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    )
}

export function ScreenWrapper({children, colors=['#FF7B7B', '#E35F9F']}) {
  return (
      <LinearGradient colors={colors} style={styles.gradient}>
          <View style={styles.safeView}>
              {children}
          </View>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
    gradient : {
      flexGrow: 1,
    },
    safeView: {
      backgroundColor: 'transparent',
      flexGrow: 1,
    },
  })
  