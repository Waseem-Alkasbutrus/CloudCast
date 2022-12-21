import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const getStyle = (Size, Weight) => {
  return StyleSheet.create ({
    viewContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
  
      padding: 2,
    },
    
    icon : {
      height: Size + 2,
      width: Size + 2
    },
    
    stat: {
      fontSize: Size,
      fontWeight: Weight,
      color: '#FBFBFB',

      paddingHorizontal: 2
    }
  })
}

export default function Stat({ Icon=null, Stat, Size=16, Weight='380' }) {
  const styles = getStyle(Size, Weight)
  
  return (
    <View style={styles.viewContainer}>
      <Image style={styles.icon} source={Icon} />
      <Text style={styles.stat}>{Stat}</Text>
    </View>
  )
}