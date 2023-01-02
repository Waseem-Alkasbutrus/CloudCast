import React from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import Font from './Font'

import Stat from './IconStat'

export function CityListItem({
  Weather = undefined,
  Action = () => {
    console.log('press')
  },
}) {
  return (
    <Pressable onPress={Action} style={styles.cityItemContainer}>
      <View style={styles.namesContainer}>
        <Font style={styles.cityName}>{Weather.city.name}</Font>
        <Font style={styles.countryName}>{Weather.city.country}</Font>
      </View>

      <View style={styles.statContainer}>
        <Stat
          Icon={require('../../assets/icons/Thermometer.png')}
          Size={22}
          Stat={Math.round(Weather.list[0].main.temp)}
          Unit="f"
        />

        <View style={styles.divider} />

        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={22}
          Stat={Weather.list[0].pop * 100}
          Unit="%"
        />
      </View>
    </Pressable>
  )
}

export function CitySearchListItem({
  City = undefined,
  Action = () => {
    console.log(City)
  },
}) {
  return (
    <Pressable onPress={Action} style={styles.cityItemContainer}>
      <View style={styles.namesContainer}>
        <Font style={styles.cityName}>{City.name}</Font>
        <Font style={styles.countryName}>
          {City.state + ', ' + City.country}
        </Font>
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
