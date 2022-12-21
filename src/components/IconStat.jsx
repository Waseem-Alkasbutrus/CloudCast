import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default function Stat({
  Icon = null,
  Stat,
  Unit="NOT SPECIFIED",
  Size = 16,
  Weight = '380',
}) {
  const styles = getStyle(Size, Weight)

  let IconImg

  if (Icon != null) {
    IconImg = <Image style={styles.icon} source={Icon} />
  }

  return (
    <View style={styles.viewContainer}>
      {IconImg}
      
      <View style={styles.textWrapper}>
        <Text style={styles.stat}>{Stat}</Text>
        <Text style={styles.unit}>{Unit}</Text>
      </View>
    </View>
  )
}

const getStyle = (Size, Weight) => {
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
    },

    textWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline'
    },

    stat: {
      fontSize: Size,
      fontWeight: Weight,
      color: '#FBFBFB',

      paddingHorizontal: 2,
    },

    unit: {
      fontSize: Size / 1.5,
      fontWeight: Weight,
      color: '#FBFBFB',
      paddingHorizontal: 2,
    },
  })
}
