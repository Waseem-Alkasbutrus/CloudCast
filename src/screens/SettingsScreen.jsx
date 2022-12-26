import React from 'react'
import { StyleSheet, Alert } from 'react-native'

import TitledSection from '../components/TitledSection'
import { OpenDialogue } from '../components/SettingItem'
import Button from '../components/Button'
import ScreenWrapper from '../components/ScreenWrapper'

buttonShouldDo = () => {
  console.log('button pressed')
}

const deleteSaves = () =>
  Alert.alert(
    'Are you sure?',
    'If you delete saves, we will not be able to recover them anymore',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Delete Saves', onPress: () => console.log('Items Deleted') },
    ],
    {
      cancelable: true,
    },
  )

export default function SettingsScreen() {
  return (
    <ScreenWrapper>
      <TitledSection Label={'Privacy'}>
        <OpenDialogue
          SettingName={'Location'}
          Description={'On'}
          Icon={require('../../assets/icons/Location.png')}
        />
      </TitledSection>

      <TitledSection Label={'Units'}>
        <OpenDialogue
          SettingName={'Temperature'}
          Description={'Fahrenheit'}
          Icon={require('../../assets/icons/Thermometer.png')}
        />
        <OpenDialogue
          SettingName={'Length'}
          Description={'Miles'}
          Icon={require('../../assets/icons/Ruler.png')}
        />
        <OpenDialogue
          SettingName={'Pressure'}
          Description={'Atm'}
          Icon={require('../../assets/icons/Pressure.png')}
        />
      </TitledSection>

      <TitledSection Label={'Danger Zone'}>
        <Button Label={'Delete Saved Data'} Action={deleteSaves}></Button>
      </TitledSection>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  settingsContainer: {
    backgroundColor: '#39393920',
    borderRadius: 10,
    flexGrow: 1,
  },
})
