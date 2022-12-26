import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Font from './Font'

export default function Button({ Label, Action }) {
  return (
    <Pressable onPress={Action} style={styles.button}>
      <Font style={styles.label}>{Label}</Font>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',

    alignItems: 'center',
    padding: 8,
    marginVertical: 4,

    borderRadius: 10,

    backgroundColor: '#39393920',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FBFBFB',
  },
})
