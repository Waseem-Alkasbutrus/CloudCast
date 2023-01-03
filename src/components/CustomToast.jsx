import { StyleSheet, View } from "react-native";
import Font from "./Font";

export const CustomToast = {
    custom: ({text1, props}) => (
        <View style={styles.toast}>
            <Font style={styles.text1}>{text1}</Font>
        </View>
    )
}

const styles = StyleSheet.create({
    toast: {
        backgroundColor: '#A04B71BF',
        padding: 8,
        borderRadius: 8,
    },
    text1: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FBFBFB',
    }
})