import { useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Font from './Font'
import { Colors } from './GlobalVars'
import TitledSection from './TitledSection'
import Stat from './IconStat'

export default function RadioField({ Label, Options }) {
  const [ActiveButton, setActiveButton] = useState(0)

  if (Options.length < 2) {
    console.error('')
  }

  let RadioButtons = Options.map((option, index) => {
    return (
      <RadioButton
        key={index}
        Label={option}
        Index={index}
        setActive={setActiveButton}
        IsActive={ActiveButton === index}
      ></RadioButton>
    )
  })

  return (
    <View style={{marginBottom: 8}}>
      {RadioButtons}
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
      <Image style={styles.check} source={IsActive? require('../../assets/icons/CheckedRadio.png') : require('../../assets/icons/UncheckedRadio.png')}></Image>
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
    check : {
        width: 24,
        height: 24
    }
  })
}
