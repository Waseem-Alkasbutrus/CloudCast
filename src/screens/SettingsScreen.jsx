import React from "react";
import { View, StyleSheet } from "react-native";

import TitledSection from '../components/TitledSection'
import { OpenDialogue } from "../components/SettingItem";

export default function SettingsScreen() {
    return (
        <View style={styles.settingsContainer}>
            <TitledSection Label={'Privacy'}>
            </TitledSection>

            <TitledSection Label={'Units'}>
                <OpenDialogue SettingName={'Temperature'} Description={'Fahrenheit'} Icon={require('../../assets/icons/Thermometer.svg')} />
                <OpenDialogue SettingName={'Length'} Description={'Miles'} Icon={require('../../assets/icons/Ruler.svg')} />
                <OpenDialogue SettingName={'Pressure'} Description={'Atm'} Icon={require('../../assets/icons/Pressure.svg')} />
            </TitledSection>

            <TitledSection Label={'Danger Zone'}>
                
            </TitledSection>
        </View>
    );
}


const styles = StyleSheet.create({
    settingsContainer: {
      backgroundColor: '#F7F7F7',
      flexGrow: 1
    },
  })