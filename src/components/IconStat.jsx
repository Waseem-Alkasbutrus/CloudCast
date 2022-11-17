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

const style = StyleSheet.create({
  

  extraLarge: {
    fontSize: 32,
    fontWeight: '420',

    paddingHorizontal: 2
  },

  large: {
    fontSize: 20,
    fontWeight: '400',

    paddingHorizontal: 2
  },

  medium: {
    fontSize: 16,
    fontWeight: '380',

    paddingHorizontal: 2
  },

  small: {
    fontSize: 12,
    fontWeight: '360',

    paddingHorizontal: 2
  },
})
