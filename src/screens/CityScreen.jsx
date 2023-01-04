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
          fav.city === currentCity.city &&
          fav.lon === currentCity.lon &&
          fav.lat === currentCity.lat,
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
          fav.city != currentCity.city &&
          fav.lon != currentCity.lon &&
          fav.lat != currentCity.lat,
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
          fav.city === currentCity.city &&
          fav.lon === currentCity.lon &&
          fav.lat === currentCity.lat,
      )

      setBookmarked(filter.length != 0)
    }
  } catch (e) {
    console.error('[ERROR: addToFavorites()]', e)
  }
}

export default function CityScreen({ navigation, route }) {
  const [Bookmarked, setBookmarked] = useState()
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

    fetch(
      'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' +
        route.params.Lat +
        '&lon=' +
        route.params.Lon +
        '&cnt=8&units=imperial&appid=' +
        API_KEY,
    )
      .then((res) => res.json())
      .then((res) => setWeeklyWeather(res))

    fetch(
      'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=' +
        route.params.Lat +
        '&lon=' +
        route.params.Lon +
        '&appid=' +
        API_KEY +
        '&units=imperial&cnt=13',
    )
      .then((res) => res.json())
      .then((res) => setHourlyWeather(res))
  }, [])

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
        <View style={{display: 'flex', flexGrow: 1, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size={'large'} color={'#FBFBFB'}></ActivityIndicator>
        </View>
      </SafeAreaScreenWrapper>
    )
  } else {
    return (
      <SafeAreaScreenWrapper>
        {BookmarkButton}

        <Details Weather={HourlyWeather.list[0]}></Details>

        <WeeklySection Weather={WeeklyWeather}></WeeklySection>

        <HourlySection Weather={HourlyWeather}></HourlySection>

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

const favorite = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    right: 16,
    top: 8,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    zIndex: 1,
  },
  icon: {
    height: 48,
    width: 48,
  },
})

function Details({ Weather }) {
  return (
    <View style={details.cardView}>
      <View style={details.flexRow}>
        <View style={details.temp}>
          <Stat
            Stat={Math.round(Weather.main.temp)}
            Unit="f"
            Size={120}
            Weight={'420'}
          />
        </View>

        <View style={[details.flexCol, details.highLowTempsWrapper]}>
          <Stat
            Size={32}
            Stat={Math.round(Weather.main.temp_max)}
            Unit="f"
          />
          <Stat
            Size={32}
            Stat={Math.round(Weather.main.temp_min)}
            Unit="f"
          />
        </View>
      </View>

      <View style={details.desc}>
        <Stat
          Icon={getWeatherIconPath(Weather.weather[0].icon)}
          Stat={Weather.weather[0].description}
          Size={20}
        ></Stat>
      </View>

      <View style={details.flexRow}>
        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={18}
          Stat={(Weather.pop * 100).toFixed(0)}
          Unit="%"
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Feels-Like.png')}
          Size={18}
          Stat={Math.round(Weather.main.feels_like)}
          Unit="f"
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Wind.png')}
          Size={18}
          Stat={Weather.wind.speed}
          Unit="mph"
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Humidity.png')}
          Size={18}
          Stat={Weather.main.humidity}
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
    borderColor: '#FBFBFB',
    borderWidth: 0.2,
    marginHorizontal: 8,
    height: '32%',
  },
  desc: {
    marginBottom: 8,
  },
})
