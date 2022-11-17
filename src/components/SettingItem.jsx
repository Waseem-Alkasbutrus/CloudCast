import React from 'react'
import { Image, View, Text, StyleSheet, Pressable } from 'react-native'

export function OpenDialogue({
  SettingName,
  Description,
  Icon,
  Action = () => {
    console.log('pressed setting')
  },
}) {
  return (
    <Pressable onPress={Action} style={[styles.SettingItemContainer, styles.flexRow]}>
      <View style={styles.flexRow}>
        <Image style={styles.icon} source={Icon} />
        <View style={[styles.infoContainer, styles.infoContainer]}>
          <Text style={styles.settingName}>{SettingName}</Text>
          <Text style={styles.settingDescription}>{Description}</Text>
        </View>
      </View>

      <Image style={[styles.icon, {transform: [{ rotate: "-90deg" }]}]} source={require('../../assets/icons/Expand-Down-Arrow.svg')} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  SettingItemContainer: {
    padding: 8,
    marginVertical: 4,
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  settingName: {
    fontSize: 16,
    fontWeight: '400',
  },

  settingDescription: {
    fontSize: 12,
    fontWeight: '350',
  },

  infoContainer: {
    display: 'flex',
    flexDirection: 'column',

    marginLeft: 8,
  },

  icon: {
    height: 40,
    width: 40,
  },
})
