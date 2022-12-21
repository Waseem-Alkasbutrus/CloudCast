import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import CityListItem from '../components/CityListItem'
import CityDetailedItem from '../components/CityDetailedItem'
import TitledSection from '../components/TitledSection'

import FavoriteCitiesList from '../../assets/FavoriteCities'

import { API_KEY } from '@env'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import ScreenWrapper from '../components/ScreenWrapper'

export default function HomeScreen({ navigation }) {
  const [GPSweather, setGPSWeather] = useState()
  const [FavWeather, setFavWeather] = useState([])

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=32.779&lon=-96.809&appid=' +
        API_KEY +
        '&units=imperial',
    )
      .then((res) => res.json())
      .then((wthr) => setGPSWeather(wthr))

    let weather = []
    for (let i = 0; i < FavoriteCitiesList.length; i++) {
      let city = FavoriteCitiesList[i]

      weather.push(
        fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=' +
            city.lat +
            '&lon=' +
            city.long +
            '&appid=' +
            API_KEY +
            '&units=imperial',
        ).then((res) => res.json()),
      )
    }

    Promise.all(weather).then((wthr) => setFavWeather(wthr))
  }, [])

  let citylistItems = (
    <TitledSection Label={'Favorite Cities'}>
      {FavWeather != undefined ? (
        FavWeather.map((city) => {
          return (
            <CityListItem
              key={city.name}
              Weather={city}
              Action={() => {
                navigation.navigate('City', { Weather: city })
              }}
            ></CityListItem>
          )
        })
      ) : (
        <Text>No Favorites Added</Text>
      )}
    </TitledSection>
  )

  return (
    <ScreenWrapper>
      <CityDetailedItem Weather={GPSweather}></CityDetailedItem>

      {citylistItems}
    </ScreenWrapper>
  )
}
