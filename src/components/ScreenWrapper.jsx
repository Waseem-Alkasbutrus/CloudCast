import { LinearGradient } from "expo-linear-gradient";
import react from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({children, colors=['#FF7B7B', '#E35F9F']}) {
    return (
        <LinearGradient colors={colors} style={styles.gradient}>
            <SafeAreaView style={styles.safeView}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient : {
      flex: 1,
    },
    safeView: {
      backgroundColor: 'transparent',
      flexGrow: 1,
    },
  })
  