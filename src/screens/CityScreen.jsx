import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

import { SafeAreaScreenWrapper } from '../components/ScreenWrapper'

import Stat from '../components/IconStat'
import { HourlySection, WeeklySection } from '../components/ForecastItem'
import { getWeatherIconPath } from '../components/WeatherIcon'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Font from '../components/Font'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { CustomToast } from '../components/CustomToast'

import { API_KEY } from '@env'
import { Colors, getUnitSystem } from '../components/GlobalVars'

async function saveFavs(favs) {
  try {
    await AsyncStorage.setItem('Favorites', JSON.stringify(favs))
  } catch (e) {
    console.error('[ERROR: saveFavs()]', e)
  }
}

async function addToFavorites(city, lon, lat) {
  let currentCity = { city: city, lat: lat, lon: lon }

  try {
    let favs = await AsyncStorage.getItem('Favorites').then((res) =>
      JSON.parse(res),
    )

    let filter
    if (favs != undefined) {
      filter = favs.filter(
        (fav) =>
          fav.lon.toFixed(4) === currentCity.lon.toFixed(4) &&
          fav.lat.toFixed(4) === currentCity.lat.toFixed(4),
      )

      if (filter.length == 0) {
        favs.push(currentCity)

        saveFavs(favs)
        Toast.show({
          type: 'custom',
          text1: 'Added ' + city + ' to favorites',
        })
      }
    }
  } catch (e) {
    console.error('[ERROR: addToFavorites()]', e)
  }
}

async function removeFromFavorites(city, lon, lat) {
  let currentCity = { city: city, lat: lat, lon: lon }
  try {
    let favs = await AsyncStorage.getItem('Favorites').then((res) =>
      JSON.parse(res),
    )

    if (favs !== null) {
      let filter = favs.filter(
        (fav) =>
          fav.lon.toFixed(4) != currentCity.lon.toFixed(4) &&
          fav.lat.toFixed(4) != currentCity.lat.toFixed(4),
      )

      saveFavs(filter)
      Toast.show({
        type: 'custom',
        text1: 'Removed ' + city + ' from favorites',
      })
    }
  } catch (e) {
    console.error('[ERROR: removeFromFavorites()]', e)
  }
}

async function isInFavorites(city, lon, lat, setBookmarked) {
  let currentCity = { city: city, lat: lat, lon: lon }

  try {
    let favs = await AsyncStorage.getItem('Favorites').then((res) =>
      JSON.parse(res),
    )

    let filter
    if (favs != undefined) {
      filter = favs.filter(
        (fav) =>
          fav.lon.toFixed(4) === currentCity.lon.toFixed(4) &&
          fav.lat.toFixed(4) === currentCity.lat.toFixed(4),
      )

      setBookmarked(filter.length != 0)
    }
  } catch (e) {
    console.error('[ERROR: addToFavorites()]', e)
  }
}

async function fetchWeather(
  coords,
  setWeeklyWeather,
  setHourlyWeather,
  setUnitSystem,
) {
  let unitSystem = await getUnitSystem()
  setUnitSystem(unitSystem)

  fetch(
    'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' +
      coords.lat +
      '&lon=' +
      coords.lon +
      '&cnt=8&units=' +
      unitSystem.units +
      '&appid=' +
      API_KEY,
  )
    .then((res) => res.json())
    .then((res) => setWeeklyWeather(res))

  fetch(
    'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=' +
      coords.lat +
      '&lon=' +
      coords.lon +
      '&appid=' +
      API_KEY +
      '&units=' +
      unitSystem.units
  )
    .then((res) => res.json())
    .then((res) => setHourlyWeather(res))
}

export default function CityScreen({ navigation, route }) {
  const [Bookmarked, setBookmarked] = useState()
  const [UnitSystem, setUnitSystem] = useState()
  const [WeeklyWeather, setWeeklyWeather] = useState()
  const [HourlyWeather, setHourlyWeather] = useState()

  useEffect(() => {
    isInFavorites(
      route.params.CityName,
      route.params.Lon,
      route.params.Lat,
      setBookmarked,
    )

    navigation.setOptions({ title: route.params.CityName })

    fetchWeather(
      { lon: route.params.Lon, lat: route.params.Lat },
      setWeeklyWeather,
      setHourlyWeather,
      setUnitSystem,
    )
  }, [])

  let favorite = getFavoriteStyle(Colors._z)
  let BookmarkButton

  if (Bookmarked == true || Bookmarked == false) {
    BookmarkButton = (
      <View style={favorite.container}>
        <Pressable
          style={favorite.button}
          onPress={() => {
            if (!Bookmarked) {
              addToFavorites(
                route.params.CityName,
                route.params.Lon,
                route.params.Lat,
              )
            } else {
              removeFromFavorites(
                route.params.CityName,
                route.params.Lon,
                route.params.Lat,
              )
            }
            setBookmarked(!Bookmarked)
          }}
        >
          <Image
            style={favorite.icon}
            source={
              Bookmarked == true
                ? require('../../assets/icons/Bookmark-Filled.png')
                : require('../../assets/icons/Bookmark-Outline.png')
            }
          ></Image>
        </Pressable>
      </View>
    )
  }

  if (!HourlyWeather || !WeeklyWeather) {
    return (
      <SafeAreaScreenWrapper>
        {BookmarkButton}
        <View
          style={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <ActivityIndicator
            size={'large'}
            color={'#FBFBFB'}
          ></ActivityIndicator>
        </View>

        <Toast
          position="bottom"
          bottomOffset={80}
          visibilityTime={2000}
          config={CustomToast}
        />
      </SafeAreaScreenWrapper>
    )
  } else {
    return (
      <SafeAreaScreenWrapper>
        {BookmarkButton}

        <Details
          Day={WeeklyWeather.list[0]}
          Current={HourlyWeather.list[0]}
          UnitSystem={UnitSystem}
        ></Details>

        <WeeklySection
          Weather={WeeklyWeather}
          UnitSystem={UnitSystem}
        ></WeeklySection>

        <HourlySection
          Weather={HourlyWeather}
          UnitSystem={UnitSystem}
        ></HourlySection>

        <Toast
          position="bottom"
          bottomOffset={80}
          visibilityTime={2000}
          config={CustomToast}
        />
      </SafeAreaScreenWrapper>
    )
  }
}

function getFavoriteStyle(colors) {
  return StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      position: 'absolute',
      right: 16,
      top: 4,
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      zIndex: 1,
    },
    icon: {
      height: 40,
      width: 40,
      tintColor: colors.text
    },
  })
}

function Details({ Day, Current, UnitSystem }) {
  return (
    <View style={details.cardView}>
      <View style={details.flexRow}>
        <View style={details.temp}>
          <Stat
            Stat={Math.round(Current.main.temp)}
            Unit={UnitSystem.temp}
            Size={120}
            Weight={'420'}
          />
        </View>

        <View style={[details.flexCol, details.highLowTempsWrapper]}>
          <Stat
            Size={32}
            Stat={Math.round(Day.temp.max)}
            Unit={UnitSystem.temp}
          />
          <Stat
            Size={32}
            Stat={Math.round(Day.temp.min)}
            Unit={UnitSystem.temp}
          />
        </View>
      </View>

      <View style={details.desc}>
        <Stat
          Icon={getWeatherIconPath(Current.weather[0].icon)}
          Stat={Current.weather[0].description}
          Size={20}
        ></Stat>
      </View>

      <View style={details.flexRow}>
        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={18}
          Stat={(Current.pop * 100).toFixed(0)}
          Unit="%"
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Feels-Like.png')}
          Size={18}
          Stat={Math.round(Current.main.feels_like)}
          Unit={UnitSystem.temp}
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Wind.png')}
          Size={18}
          Stat={Current.wind.speed}
          Unit={UnitSystem.speed}
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Humidity.png')}
          Size={18}
          Stat={Current.main.humidity}
          Unit="%"
        />
      </View>
    </View>
  )
}

const details = StyleSheet.create({
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    paddingHorizontal: 8,
    marginBottom: 16,
    marginTop: 62,
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },

  temp: {
    marginRight: 16,
  },

  highLowTempsWrapper: {
    display: 'flex',
    flexDirection: 'column',

    height: 120,

    alignItems: 'center',
    justifyContent: 'space-around',
  },

  divider: {
    marginHorizontal: 10,
    height: '32%',
  },
  desc: {
    marginBottom: 8,
  },
})
