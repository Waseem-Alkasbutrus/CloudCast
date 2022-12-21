import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

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
        <Text style={styles.cityName}>{Weather.name}</Text>
        <Text style={styles.countryName}>{Weather.sys.country}</Text>
      </View>

      <View style={styles.statContainer}>
        <Stat
          Icon={require('../../assets/icons/Thermometer.png')}
          size={20}
          Stat={Weather.main.temp + ' f'}
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

    backgroundColor: '#39393920',
    borderRadius: 10,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,

    // elevation: 6,
  },

  cityName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FBFBFB',
  },

  countryName: {
    fontSize: 12,
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
