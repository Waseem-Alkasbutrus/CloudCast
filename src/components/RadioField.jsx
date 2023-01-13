import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from './Button'
import Font from './Font'
import { Colors, saveVar } from './GlobalVars'

async function getCurrentValue(options, asyncKey, setActiveButton) {
  let currentSetting = await AsyncStorage.getItem(asyncKey)
  let currentKey = options.indexOf(currentSetting)

  if (currentKey === -1) {
    console.err(currentSetting, ' is not one of the passed options')
  }

  setActiveButton(currentKey)
}

export default function RadioField({
  Options,
  HideModal,
  AsyncKey,
  setDescription,
}) {
  const [ActiveButton, setActiveButton] = useState(0)

  useEffect(() => {
    getCurrentValue(Options, AsyncKey, setActiveButton)
  }, [])

  if (Options.length < 2) {
    console.error('')
  }

  let RadioButtons = Options.map((option, index) => {
    return (
      <RadioButton
        key={index}
        Label={option[0].toUpperCase() + option.substring(1)}
        Index={index}
        setActive={setActiveButton}
        IsActive={ActiveButton === index}
      ></RadioButton>
    )
  })

  return (
    <View>
      <View style={{ marginBottom: 8 }}>{RadioButtons}</View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <PrimaryButton
          style={{ paddingHorizontal: 16 }}
          Label="Select"
          Action={() => {
            saveVar(AsyncKey, Options[ActiveButton])
            setDescription(Options[ActiveButton])
            HideModal(false)
          }}
        ></PrimaryButton>
        <SecondaryButton
          Action={() => HideModal(false)}
          Label="Cancel"
          style={{ marginLeft: 8 }}
        ></SecondaryButton>
      </View>
    </View>
  )
}

function RadioButton({ Label, setActive, Index, IsActive }) {
  let styles = getStyle(Colors._z)

  return (
    <Pressable
      onPress={() => {
        setActive(Index)
      }}
      HitRect={8}
      style={styles.button}
    >
      <Font style={styles.label}>{Label}</Font>
      <Image
        style={styles.check}
        source={
          IsActive
            ? require('../../assets/icons/CheckedRadio.png')
            : require('../../assets/icons/UncheckedRadio.png')
        }
      ></Image>
    </Pressable>
  )
}

function getStyle(colors) {
  return StyleSheet.create({
    label: {
      fontSize: 24,
    },
    button: {
      padding: 8,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    check: {
      width: 24,
      height: 24,
      tintColor: colors.text,
    },
  })
}
