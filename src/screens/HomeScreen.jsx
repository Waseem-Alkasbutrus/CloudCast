import React from 'react'
import { useEffect, useState } from 'react'

import { CityListItem } from '../components/CityListItem'
import CityDetailedItem from '../components/CityDetailedItem'
import TitledSection from '../components/TitledSection'

import { API_KEY } from '@env'
import { SafeAreaScreenWrapper } from '../components/ScreenWrapper'
import Font from '../components/Font'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location'
import { StyleSheet } from 'react-native'

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

    try {
      AsyncStorage.getItem('Favorites')
        .then((res) => JSON.parse(res))
        .then((favs) => { 
          if (favs.length != undefined) {
            let weather = []
            for (let i = 0; i < favs.length; i++) {
              let city = favs[i]
              
              weather.push(
                fetch(
                'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=' +
                city.lat +
                '&lon=' +
                city.lon +
                '&appid=' +
                API_KEY +
                '&units=imperial&cnt=13',
                ).then((res) => res.json()),
                )
              }
              
              Promise.all(weather).then((wthr) => setFavWeather(wthr))
            } else {
              setFavWeather(undefined)
              console.log("no favorites")
            }
        })
    } catch (e) {
      console.log(e)
    }
  }, [])

  let citylistItems = (
    <TitledSection Label={'Favorite Cities'}>
      {FavWeather.length > 0 ? (
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
        <Font style={styles.noFavsText}>No favorites added...</Font>
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
    <SafeAreaScreenWrapper>
      {gps}
      {citylistItems}
    </SafeAreaScreenWrapper>
  )
}

const styles = StyleSheet.create({
  noFavsText: { 
    fontSize: 20,
    color: '#FBFBFB',
    textAlign: 'center',
    marginTop: 24,
  }
})
