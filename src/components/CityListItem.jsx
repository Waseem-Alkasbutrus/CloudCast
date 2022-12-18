import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import Stat from './IconStat'

export default function CityListItem({
  CityName,
  CountryName,
  Action = () => {
    console.log('press')
  },
}) {
  return (
    <Pressable onPress={Action} style={styles.cityItemContainer}>
      <View style={styles.namesContainer}>
        <Text style={styles.cityName}>{CityName}</Text>
        <Text style={styles.countryName}>{CountryName}</Text>
      </View>

      <View style={styles.statContainer}>
        <Stat
          Icon={require('../../assets/icons/Thermometer.png')}
          size={20}
          Stat={'72 F'}
        />

        <View style={styles.divider} />

        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          size={20}
          Stat={'20 %'}
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

    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  cityName: {
    fontSize: 18,
    fontWeight: '400',
  },

  countryName: {
    fontSize: 14,
    fontWeight: '350',
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
    borderColor: '#000000',
    borderWidth: 1,
    marginHorizontal: 8,
    height: '32%',
  },
})
