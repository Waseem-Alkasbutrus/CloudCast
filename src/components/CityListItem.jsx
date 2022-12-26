import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Font from './Font'

import Stat from './IconStat'

export default function CityListItem({
  Weather,
  Action = () => {
    console.log('press')
  },
}) {
  return (
    <Pressable onPress={Action} style={styles.cityItemContainer}>
      <View style={styles.namesContainer}>
        <Font style={styles.cityName}>{Weather.name}</Font>
        <Font style={styles.countryName}>{Weather.sys.country}</Font>
      </View>

      <View style={styles.statContainer}>
        <Stat
          Icon={require('../../assets/icons/Thermometer.png')}
          Size={22}
          Stat={Math.round(Weather.main.temp)}
          Unit="f"
        />

        <View style={styles.divider} />

        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={22}
          Stat={'20'}
          Unit="%"
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cityItemContainer: {
    display: 'flex',
    flexDirection: 'row',

    padding: 8,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#39393916',
    borderRadius: 10,
  },

  cityName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FBFBFB',
  },

  countryName: {
    fontSize: 14,
    fontWeight: '300',
    color: '#FBFBFB',
  },

  namesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  statContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },

  divider: {
    borderColor: '#FBFBFB',
    borderWidth: 1,
    marginHorizontal: 8,
    height: '32%',
  },
})
