import react, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import Stat from './IconStat'
import Font from './Font'

import { API_KEY } from '@env'
import WeatherIcon from './WeatherIcon'

export function HourlySection({ Weather }) {
  // console.log(Weather)

  let hourlyForecast = Weather.list.map((entry) => {
    return <HourlyForecastItem key={entry.dt} Hour={entry}></HourlyForecastItem>
  })

  return (
    <View style={hourly.hourlySection}>
      <View style={hourly.hourHeaderWrapper}>
        <View style={hourly.statCenter}>
          <Font style={hourly.headerLabel}>Time</Font>
        </View>

        <View style={hourly.statCenter}></View>

        <View style={hourly.statCenter}>
          <Font style={hourly.headerLabel}>Wind</Font>
        </View>
        <View style={hourly.statCenter}>
          <Font style={hourly.headerLabel}>Temp</Font>
        </View>
        <View style={hourly.statCenter}>
          <Font style={hourly.headerLabel}>Rain</Font>
        </View>
      </View>

      <ScrollView>{hourlyForecast}</ScrollView>
    </View>
  )
}

function getHour(dtTxt) {
  const dt = new Date(dtTxt.replace(' ', 'T'))
  const hr = dt.getHours()

  return hr
}

function HourlyForecastItem({ Hour }) {
  let hour = getHour(Hour.dt_txt)
  let identifier = hour < 12 ? 'am' : 'pm'

  return (
    <View style={hourly.hourWrapper}>
      <View style={hourly.statLeft}>
        <Stat
          Stat={hour % 12 === 0 ? 12 : hour % 12}
          Unit={identifier}
          Size={22}
        ></Stat>
      </View>

      <View style={hourly.statCenter}>
        <WeatherIcon style={hourly.icon} Condition={Hour.weather[0].icon}></WeatherIcon>
      </View>

      <View style={hourly.statRight}>
        <Stat Stat={Hour.wind.speed.toFixed(1)} Unit={'mph'} Size={20}></Stat>
      </View>

      <View style={hourly.statRight}>
        <Stat Stat={Math.round(Hour.main.temp)} Unit={'f'} Size={20}></Stat>
      </View>

      <View style={hourly.statRight}>
        <Stat Stat={Hour.pop * 100} Unit={'%'} Size={20}></Stat>
      </View>
    </View>
  )
}

const hourly = StyleSheet.create({
  hourlySection: {
    backgroundColor: '#21212110',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingTop: 8,
    paddingHorizontal: 8,
    marginTop: 16,
    paddingBottom: 72,
    flex: 1,
  },
  hourWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: '#FBFBFB15',
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
  icon: {
    width: 28,
    height: 28,
  },
  hourHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#FBFBFB35',
    borderBottomWidth: 2,
    paddingVertical: 4,
    marginBottom: 8,
  },
  headerLabel: {
    color: '#FBFBFB',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 4,
    minWidth: 40,
  },
  statLeft: {
    minWidth: 64,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  statRight : {
    minWidth: 64,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  statCenter : {
    minWidth: 64,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export function WeeklySection({ Lon, Lat }) {
  const [Weather, setWeather] = useState()

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' +
        Lat +
        '&lon=' +
        Lon +
        '&cnt=8&units=imperial&appid=' +
        API_KEY,
    )
      .then((res) => res.json())
      .then((res) => setWeather(res))
  }, [])

  let weeklyForecast

  if (!Weather) {
    return <View></View>
  } else {
    weeklyForecast = Weather.list.map((weather, index) => {
      return (
        <WeeklyListItem
          key={weather.dt}
          Weather={weather}
          Day={index}
        ></WeeklyListItem>
      )
    })
  }

  return (
    <View style={weekly.section}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {weeklyForecast}
      </ScrollView>
    </View>
  )
}

function getDay(dayIndex) {
  const dt = new Date()
  const day = dt.getDay() + dayIndex

  return day
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function WeeklyListItem({ Weather, Day }) {
  let weekday = getDay(Day)

  return (
    <View style={weekly.card}>
      <Font style={weekly.day}>{weekdays[weekday % 7]}</Font>

      <WeatherIcon Condition={Weather.weather[0].icon} style={weekly.icon}></WeatherIcon>
      
      <Stat Stat={Math.round(Weather.temp.max)} Unit="f" Size={18}></Stat>
      <Stat Stat={Math.round(Weather.temp.min)} Unit="f" Size={18}></Stat>
    </View>
  )
}

const weekly = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'row',
    height: 'auto',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,

    backgroundColor: '#21212110',
    borderRadius: 8,

    height: 'auto',
  },
  day: {
    fontSize: 20,
    fontWeight: '500',

    color: '#FBFBFB',
    textTransform: 'uppercase',
  },
  icon: {
    width: 28,
    height: 28,
    marginVertical: 8,
  },
})
