import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Alert,
  Linking,
  Modal,
  View,
} from 'react-native'

import TitledSection from '../components/TitledSection'
import { OpenDialogue } from '../components/SettingItem'
import Button from '../components/Button'
import { SafeAreaScreenWrapper } from '../components/ScreenWrapper'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { CustomToast } from '../components/CustomToast'
import * as Location from 'expo-location'
import { Colors } from '../components/GlobalVars'
import RadioField from '../components/RadioField'
import { LinearGradient } from 'expo-linear-gradient'

async function deleteSaves() {
  try {
    await AsyncStorage.setItem('Favorites', JSON.stringify([]))
    console.log(await AsyncStorage.getItem('Favorites'))

    Toast.show({
      type: 'custom',
      text1: 'Removed all favorites',
    })
  } catch (e) {
    console.log('[ERROR]', e.message)
  }
}

function deleteSavesDialogue() {
  Alert.alert(
    'Are you sure?',
    'If you delete saves, we will not be able to recover them anymore',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete Favorites', onPress: () => deleteSaves() },
    ],
    {
      cancelable: true,
    },
  )
}

async function checkLocation(setLocationStatus) {
  let { status } = await Location.requestForegroundPermissionsAsync()

  let codes = {
    granted: 'on',
    denied: 'off',
  }

  setLocationStatus(codes[status])
}

export default function SettingsScreen() {
  const [LocationStatus, setLocationStatus] = useState()
  const [ModalVisiblity, setModalVisibility] = useState(false)
  const [ModalContent, setModalContent] = useState()

  useEffect(() => {
    checkLocation(setLocationStatus)
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
            <Button
              style={styles.selectButton}
              Label="Select"
              Action={() => setModalVisibility(false)}
            ></Button>
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
          SettingName={'Units'}
          Description={'Imperial'}
          Icon={require('../../assets/icons/Ruler.png')}
          Action={() => {
            setModalContent(
              <RadioField
                Label="Units"
                Options={['Imperial', 'Metric']}
              ></RadioField>,
            )
            setModalVisibility(true)
          }}
        />
        <OpenDialogue
          SettingName={'Theme'}
          Description={'Light'}
          Icon={require('../../assets/icons/Theme.png')}
          Action={() => {
            setModalContent(
              <RadioField
                Label="Theme"
                Options={['Light', 'Dark']}
              ></RadioField>,
            )
            setModalVisibility(true)
          }}
        />
      </TitledSection>

      <TitledSection Label={'Reset Data'}>
        <Button
          Label={'Remove All Favorites'}
          Action={deleteSavesDialogue}
        ></Button>
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
      minWidth: 320,
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
