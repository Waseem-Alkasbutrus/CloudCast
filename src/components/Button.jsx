import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'

export default function Button({ Label, Action }) {
  return (
    <Pressable onPress={Action} style={styles.button}>
      <Text style={styles.label}>{Label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    
    alignItems: 'center',
    padding: 8,
    marginVertical: 4,

    borderWidth: 2,
    borderColor: "#FF9E2C",
    borderRadius: 10,
  },
  label: {
    color: "#FF9E2C",

    fontSize: 16,
    fontWeight: '600',
  },
})
