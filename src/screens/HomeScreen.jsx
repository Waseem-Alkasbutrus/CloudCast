import React from 'react'
import { useEffect, useState } from 'react'

import { CityListItem } from '../components/CityListItem'
import CityDetailedItem from '../components/CityDetailedItem'
import TitledSection from '../components/TitledSection'

import FavoriteCitiesList from '../../assets/FavoriteCities'

import { API_KEY } from '@env'
import ScreenWrapper from '../components/ScreenWrapper'
import Font from '../components/Font'

import * as Location from 'expo-location'

async function getLocation(setGPSWeather) {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    setGPSWeather(undefined)
    return
  }

  let location = await Location.getCurrentPositionAsync({})

  getLocationWeather(setGPSWeather, location)
}

function getLocationWeather(setGPSWeather, location) {
  fetch(
    'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=' +
      location.coords.latitude +
      '&lon=' +
      location.coords.longitude +
      '&appid=' +
      API_KEY +
      '&units=imperial&cnt=1',
  )
    .then((res) => res.json())
    .then((wthr) => setGPSWeather(wthr))
}

export default function HomeScreen({ navigation }) {
  const [GPSweather, setGPSWeather] = useState()
  const [FavWeather, setFavWeather] = useState([])

  useEffect(() => {
    getLocation(setGPSWeather)

    let weather = []
    for (let i = 0; i < FavoriteCitiesList.length; i++) {
      let city = FavoriteCitiesList[i]

      weather.push(
        fetch(
          'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=' +
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
              key={city.city.name}
              Weather={city}
              Action={() => {
                navigation.navigate('City', { Weather: city })
              }}
            ></CityListItem>
          )
        })
      ) : (
        <Font>No Favorites Added</Font>
      )}
    </TitledSection>
  )

  let gps
  if (GPSweather != undefined) {
    gps = (
      <CityDetailedItem
        Weather={GPSweather}
        Action={() => {
          navigation.navigate('City', { Weather: GPSweather })
        }}
      ></CityDetailedItem>
    )
  }

  return (
    <ScreenWrapper>
      {gps}
      {citylistItems}
    </ScreenWrapper>
  )
}