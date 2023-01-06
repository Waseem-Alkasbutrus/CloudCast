import React from 'react'
import { Image, View, StyleSheet, Pressable } from 'react-native'
import Font from './Font'
import { Colors } from './GlobalVars'

export function OpenDialogue({
  SettingName,
  Description,
  Icon,
  Action = () => {
    console.log('pressed setting')
  },
}) {

  let styles = getStyle(Colors._z)
  return (
    <Pressable
      onPress={Action}
      style={[styles.SettingItemContainer, styles.flexRow]}
    >
      <View style={styles.flexRow}>
        <Image style={styles.icon} source={Icon} />
        <View style={[styles.infoContainer, styles.infoContainer]}>
          <Font style={styles.settingName}>{SettingName}</Font>
          <Font style={styles.settingDescription}>{Description}</Font>
        </View>
      </View>

      <Image
        style={[styles.icon, { transform: [{ rotate: '-90deg' }] }]}
        source={require('../../assets/icons/Expand-Down-Arrow.png')}
      />
    </Pressable>
  )
}

function getStyle(colors) {
  return StyleSheet.create({
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    SettingItemContainer: {
      padding: 8,
      marginVertical: 4,
      justifyContent: 'space-between',

      backgroundColor: colors.pressable,
      borderRadius: 10,
    },

    settingName: {
      fontSize: 18,
      fontWeight: '400',
    },

    settingDescription: {
      fontSize: 14,
      fontWeight: '350',
    },

    infoContainer: {
      display: 'flex',
      flexDirection: 'column',

      marginLeft: 8,
    },

    icon: {
      height: 28,
      width: 28,
    },
  })
}
