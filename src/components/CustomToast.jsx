import { StyleSheet, View } from "react-native";
import Font from "./Font";
import { Colors } from "./GlobalVars";

export const CustomToast = {
    custom: ({text1, props}) => (
        <View style={[styles.toast, {backgroundColor: Colors._z.text}]}>
            <Font style={[styles.text1, {color: Colors._z.gradient[1]}]}>{text1}</Font>
        </View>
    )
}

const styles = StyleSheet.create({
    toast: {
        padding: 8,
        borderRadius: 8,
    },
    text1: {
        fontSize: 16,
        fontWeight: '500',
    }
})