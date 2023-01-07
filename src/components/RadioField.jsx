import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Button from './Button'
import Font from './Font'
import { Colors, saveVar } from './GlobalVars'

export default function RadioField({ Options, HideModal, AsyncKey }) {
  const [ActiveButton, setActiveButton] = useState(0)

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
      <Button
        Label="Select"
        Action={() => {
          saveVar(AsyncKey, Options[ActiveButton])
          HideModal(false)
        }}
      ></Button>
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
    },
  })
}
