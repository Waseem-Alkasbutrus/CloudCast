import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Font from './Font'
import { Colors } from './GlobalVars'

export default function Button({ Label, Action }) {
  let styles = getStyle(Colors._z)
  return (
    <Pressable onPress={Action} style={styles.button}>
      <Font style={styles.label}>{Label}</Font>
    </Pressable>
  )
}

function getStyle(colors) {
  return StyleSheet.create({
    button: {
      display: 'flex',

      alignItems: 'center',
      padding: 8,
      marginVertical: 4,

      borderRadius: 10,

      backgroundColor: colors.button,
    },
    label: {
      fontSize: 18,
      fontWeight: '500',
    },
  })
}
