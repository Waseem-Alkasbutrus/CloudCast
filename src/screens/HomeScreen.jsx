import React from 'react'
import { StyleSheet, View } from 'react-native'

import CityListItem from '../components/CityListItem'
import CityDetailedItem from '../components/CityDetailedItem'
import TitledSection from '../components/TitledSection'

export default function HomeScreen() {
  return (
    <View style={style.homeContainer}>
      <CityDetailedItem CityName={'Hurst'}></CityDetailedItem>

      <TitledSection Label={'Favorite Cities'}>
        <CityListItem
          CityName={'Dallas'}
          CountryName={'TX, United States'}
        ></CityListItem>

        <CityListItem
          CityName={'Arlington'}
          CountryName={'TX, United States'}
        ></CityListItem>

        <CityListItem
          CityName={'Austin'}
          CountryName={'TX, United States'}
        ></CityListItem>
      </TitledSection>
    </View>
  )
}

const style = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#F7F7F7',
    flexGrow: 1
  },
})
