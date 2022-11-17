import React from "react";
import { View, StyleSheet, Alert } from "react-native";

import TitledSection from '../components/TitledSection'
import { OpenDialogue } from "../components/SettingItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

buttonShouldDo = () => {console.log("button pressed")}

const deleteSaves = () =>
Alert.alert(
  "Are you sure?",
  "If you delete saves, we will not be able to recover them anymore",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Delete Saves", onPress: () => console.log("Items Deleted") }
  ],
  {
    cancelable: true,
  }
);



export default function SettingsScreen() {
    return (
        <SafeAreaView style={styles.settingsContainer}>
            <TitledSection Label={'Privacy'}>
                <OpenDialogue SettingName={'Location'} Description={'On'} Icon={require('../../assets/icons/Location.svg')} />
            </TitledSection>

            <TitledSection Label={'Units'}>
                <OpenDialogue SettingName={'Temperature'} Description={'Fahrenheit'} Icon={require('../../assets/icons/Thermometer.svg')} />
                <OpenDialogue SettingName={'Length'} Description={'Miles'} Icon={require('../../assets/icons/Ruler.svg')} />
                <OpenDialogue SettingName={'Pressure'} Description={'Atm'} Icon={require('../../assets/icons/Pressure.svg')} />
            </TitledSection>

            <TitledSection Label={'Danger Zone'}>
                <Button Label={"Delete Saved Data"} Action={deleteSaves}></Button>
            </TitledSection>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    settingsContainer: {
      backgroundColor: '#F7F7F7',
      flexGrow: 1
    },
  })