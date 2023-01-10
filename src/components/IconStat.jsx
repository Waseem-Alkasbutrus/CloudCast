import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import Font from './Font'
import { Colors } from './GlobalVars'

export default function Stat({
  Icon = null,
  Stat,
  Unit,
  Size = 16,
  Weight = '380',
}) {
  const styles = getStyle(Size, Weight, Colors._z)

  let IconImg

  if (Icon != null) {
    IconImg = <Image style={styles.icon} source={Icon} />
  }

  return (
    <View style={styles.viewContainer}>
      {IconImg}
      
      <View style={styles.textWrapper}>
        <Font style={styles.stat}>{Stat}</Font>
        <Font style={styles.unit}>{Unit}</Font>
      </View>
    </View>
  )
}

const getStyle = (Size, Weight, colors) => {
  return StyleSheet.create({
    viewContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      padding: 2,
    },

    icon: {
      height: Size + 2,
      width: Size + 2,
      tintColor: colors.text,
    },

    textWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline'
    },

    stat: {
      fontSize: Size,
      fontWeight: Weight,
      lineHeight: Size * 1.1,

      paddingHorizontal: 2,
    },

    unit: {
      fontSize: Size * 0.68,
      fontWeight: Weight,
      paddingHorizontal: 2,
    },
  })
}
