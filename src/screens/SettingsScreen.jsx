import React, { useEffect, useState } from 'react'
import { StyleSheet, Alert, Linking, Modal, View } from 'react-native'

import TitledSection from '../components/TitledSection'
import { OpenDialogue } from '../components/SettingItem'
import { PrimaryButton } from '../components/Button'
import { SafeAreaScreenWrapper } from '../components/ScreenWrapper'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { CustomToast } from '../components/CustomToast'
import * as Location from 'expo-location'
import { Colors } from '../components/GlobalVars'
import RadioField from '../components/RadioField'
import { LinearGradient } from 'expo-linear-gradient'
import { Warning } from '../components/Dialogue'

async function deleteSaves() {
  try {
    await AsyncStorage.setItem('Favorites', JSON.stringify([]))

    Toast.show({
      type: 'custom',
      text1: 'Removed all favorites',
    })
  } catch (e) {
    console.error('[ERROR]', e.message)
  }
}

async function resetToDefaults(setters) {
  try {
    await AsyncStorage.setItem('Units', 'imperial')
    await AsyncStorage.setItem('ColorScheme', 'Light')

    setters.map((setter) => setter.func(setter.param))

    Toast.show({
      type: 'custom',
      text1: 'Reset settings. Restart app to see all changes.'
    })
  } catch (e) {
    console.error(e)
  }
}

async function checkLocation(setLocationStatus) {
  let { status } = await Location.requestForegroundPermissionsAsync()

  let codes = {
    granted: 'on',
    denied: 'off',
  }

  setLocationStatus(codes[status])
}

async function checkUnitSystem(setUnitSystem) {
  let units = await AsyncStorage.getItem('Units')
  setUnitSystem(units[0].toUpperCase() + units.substring(1))
}

async function checkColorScheme(setColorScheme) {
  let color = await AsyncStorage.getItem('ColorScheme')
  setColorScheme(color[0].toUpperCase() + color.substring(1))
}

async function checkTimeFormat(setTimeFromat) {
  let time = await AsyncStorage.getItem('TimeFormat')
  setTimeFromat(time[0].toUpperCase() + time.substring(1))
}

export default function SettingsScreen() {
  const [ModalVisiblity, setModalVisibility] = useState(false)
  const [ModalContent, setModalContent] = useState()
  const [LocationStatus, setLocationStatus] = useState()
  const [ColorScheme, setColorScheme] = useState()
  const [UnitSystem, setUnitSystem] = useState()
  const [TimeFormat, setTimeFromat] = useState()

  useEffect(() => {
    checkLocation(setLocationStatus)
    checkColorScheme(setColorScheme)
    checkUnitSystem(setUnitSystem)
    checkTimeFormat(setTimeFromat)
  }, [])

  let colors = Colors._z
  let styles = getStyle(colors)

  return (
    <SafeAreaScreenWrapper>
      <Modal
        statusBarTranslucent={true}
        visible={ModalVisiblity}
        transparent={true}
        animationType={'slide'}
        onRequestClose={() => {
          setModalVisibility(false)
        }}
      >
        <View style={styles.modal}>
          <LinearGradient colors={colors.gradient} style={styles.dialogue}>
            {ModalContent}
          </LinearGradient>
        </View>
      </Modal>

      <TitledSection Label={'Privacy'}>
        <OpenDialogue
          SettingName={'Location'}
          Description={LocationStatus}
          Icon={require('../../assets/icons/Location.png')}
          Action={() => {
            Linking.openSettings()
          }}
        />
      </TitledSection>

      <TitledSection Label={'Customization'}>
        <OpenDialogue
          SettingName={'Theme'}
          Description={ColorScheme}
          Icon={require('../../assets/icons/Moon.png')}
          Action={() => {
            setModalContent(
              <RadioField
                Options={['Light', 'Dark']}
                HideModal={setModalVisibility}
                AsyncKey="ColorScheme"
                setDescription={setColorScheme}
              ></RadioField>,
            )
            setModalVisibility(true)
          }}
        />

        <OpenDialogue
          SettingName={'Units'}
          Description={UnitSystem}
          Icon={require('../../assets/icons/Ruler.png')}
          Action={() => {
            setModalContent(
              <RadioField
                Options={['imperial', 'metric']}
                HideModal={setModalVisibility}
                AsyncKey="Units"
                setDescription={setUnitSystem}
              ></RadioField>,
            )
            setModalVisibility(true)
          }}
        />

        <OpenDialogue
          SettingName={'Time Format'}
          Description={TimeFormat}
          Icon={require('../../assets/icons/Clock.png')}
          Action={() => {
            setModalContent(
              <RadioField
                Options={['12-Hour', '24-Hour']}
                HideModal={setModalVisibility}
                AsyncKey="TimeFormat"
                setDescription={setTimeFromat}
              ></RadioField>,
            )
            setModalVisibility(true)
          }}
        />
      </TitledSection>

      <TitledSection Label={'Reset Data'}>
        <PrimaryButton
          Label={'RESET FAVORITES'}
          Action={() => {
            setModalContent(
              <Warning
                Title={'Reset Favorite Cities?'}
                Content={
                  'This action cannot be undone. All cities in your favorites list will be removed.'
                }
                Ok={{
                  label: 'Reset',
                  action: () => {
                    deleteSaves()
                    setModalVisibility(false)
                  },
                }}
                Cancel={{
                  label: 'Cancel',
                  action: () => {
                    setModalVisibility(false)
                  },
                }}
              ></Warning>,
            )
            setModalVisibility(true)
          }}
        ></PrimaryButton>

        <PrimaryButton
          Label={'RESET TO DEFAULT SETTINGS'}
          Action={() => {
            setModalContent(
              <Warning
                Title={'Reset All Settings?'}
                Content={
                  'This action cannot be undone. All your settings will revert to their default values.'
                }
                Ok={{
                  label: 'Reset',
                  action: () => {
                    resetToDefaults([
                      { func: setColorScheme, param: 'Light' },
                      { func: setUnitSystem, param: 'imperial' },
                    ])
                    setModalVisibility(false)
                  },
                }}
                Cancel={{
                  label: 'Cancel',
                  action: () => {
                    setModalVisibility(false)
                  },
                }}
              ></Warning>,
            )
            setModalVisibility(true)
          }}
        ></PrimaryButton>
      </TitledSection>

      <Toast
        position="bottom"
        bottomOffset={80}
        visibilityTime={2000}
        config={CustomToast}
      />
    </SafeAreaScreenWrapper>
  )
}

function getStyle(colors) {
  return StyleSheet.create({
    modal: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
    },
    dialogue: {
      width: 360,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
    },
  })
}
