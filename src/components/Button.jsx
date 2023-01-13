import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Font from './Font'
import { Colors } from './GlobalVars'

export function PrimaryButton({ Label, Action, style }) {
  let styles = getStyle(Colors._z)
  return (
    <Pressable onPress={Action} style={[styles.buttonTemplate, styles.primaryButton, style]}>
      <Font style={styles.label}>{Label}</Font>
    </Pressable>
  )
}

export function SecondaryButton({ Label, Action, style }) {
  let styles = getStyle(Colors._z)
  return (
    <Pressable onPress={Action} style={[styles.buttonTemplate, styles.secondaryButton, style]}>
      <Font style={styles.label}>{Label}</Font>
    </Pressable>
  )
}

function getStyle(colors) {
  return StyleSheet.create({
    buttonTemplate: {
      display: 'flex',
      
      alignItems: 'center',
      padding: 8,
      marginVertical: 4,
  
      borderRadius: 10,
    },
    primaryButton: {
      backgroundColor: colors.button,
    },
    secondaryButton: {
      borderWidth: 2,
      borderColor: colors.button,
    },
    label: {
      fontSize: 18,
      fontWeight: '500',
    },
  })
}
