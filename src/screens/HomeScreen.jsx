import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'

import { CityListItem } from '../components/CityListItem'
import CityDetailedItem from '../components/CityDetailedItem'
import TitledSection from '../components/TitledSection'

import { API_KEY } from '@env'
import { SafeAreaScreenWrapper } from '../components/ScreenWrapper'
import Font from '../components/Font'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location'
import {
  StyleSheet,
  RefreshControl,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native'
import { Colors, getUnitSystem } from '../components/GlobalVars'
import { useFocusEffect } from '@react-navigation/native'

async function getLocation(setGPSWeather) {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    setGPSWeather(false)
    return
  }

  let location = await Location.getCurrentPositionAsync({})

  await getLocationWeather(setGPSWeather, location)
}

async function getLocationWeather(setGPSWeather, location) {
  let units = (await getUnitSystem()).units
  fetch(
    'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=' +
      location.coords.latitude +
      '&lon=' +
      location.coords.longitude +
      '&appid=' +
      API_KEY +
      '&units=' +
      units +
      '&cnt=1',
  )
    .then((res) => res.json())
    .then((wthr) => {
      setGPSWeather(wthr)
    })
}

async function fetchBookmarkedWeather(setFavWeather) {
  let units = (await getUnitSystem()).units

  try {
    AsyncStorage.getItem('Favorites')
      .then((res) => JSON.parse(res))
      .then((favs) => {
        if (favs != undefined) {
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
                  '&units=' +
                  units +
                  '&cnt=1',
              ).then((res) => res.json()),
            )
          }

          Promise.all(weather).then((wthr) => setFavWeather(wthr))
        } else {
          AsyncStorage.setItem('Favorites', JSON.stringify([]))
          setFavWeather(undefined)
        }
      })
  } catch (e) {
    console.err(e)
  }
}

async function fetchData(setGPSWeather, setFavWeather) {
  await getLocation(setGPSWeather)
  fetchBookmarkedWeather(setFavWeather)
}

export default function HomeScreen({ navigation }) {
  const [UnitSystem, setUnitSystem] = useState()
  const [GPSweather, setGPSWeather] = useState()
  const [FavWeather, setFavWeather] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData(setGPSWeather, setFavWeather).then(() => setRefreshing(false))
  }, [])

  useFocusEffect(
    useCallback(() => {
      getUnitSystem().then((sys) => setUnitSystem(sys))
      fetchData(setGPSWeather, setFavWeather)
    }, []),
  )

  let colors = Colors._z

  let citylistItems
  if (FavWeather != undefined && FavWeather.length > 0) {
    citylistItems = FavWeather.map((cityWeather) => {
      return (
        <CityListItem
          key={cityWeather.city.name}
          Weather={cityWeather}
          UnitSystem={UnitSystem}
          Action={() => {
            navigation.navigate('City', {
              CityName: cityWeather.city.name,
              Lon: cityWeather.city.coord.lon,
              Lat: cityWeather.city.coord.lat,
            })
          }}
        ></CityListItem>
      )
    })
  } else if (FavWeather == undefined) {
    citylistItems = (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: 24,
        }}
      >
        <ActivityIndicator size={'small'} color={colors.text}></ActivityIndicator>
      </View>
    )
  } else {
    citylistItems = <Font style={styles.noFavsText}>No favorites added...</Font>
  }

  let gps
  if (GPSweather != undefined && GPSweather != false) {
    gps = (
      <CityDetailedItem
        Weather={GPSweather}
        UnitSystem={UnitSystem}
        Action={() => {
          navigation.navigate('City', {
            CityName: GPSweather.city.name,
            Lon: GPSweather.city.coord.lon,
            Lat: GPSweather.city.coord.lat,
          })
        }}
      ></CityDetailedItem>
    )
  } else if (GPSweather === undefined) {
    gps = (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: 8,
          paddingVertical: 64,
          backgroundColor: colors.pressable,
          borderRadius: 8,
        }}
      >
        <ActivityIndicator size={'small'} color={colors.text}></ActivityIndicator>
      </View>
    )
  }

  return (
    <SafeAreaScreenWrapper>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={colors.gradient[0]}
            progressBackgroundColor={colors.text}
            colors={colors.gradient}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {gps}
        <TitledSection Label={'Favorite Cities'}>{citylistItems}</TitledSection>
      </ScrollView>
    </SafeAreaScreenWrapper>
  )
}

const styles = StyleSheet.create({
  noFavsText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 24,
  },
})
