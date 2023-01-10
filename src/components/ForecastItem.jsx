import react, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import Stat from './IconStat'
import Font from './Font'

import WeatherIcon from './WeatherIcon'
import { Colors, getTimeFormat } from './GlobalVars'

export function HourlySection({ Weather, UnitSystem }) {
  let hourlyForecast = Weather.list.map((entry) => {
    return (
      <HourlyForecastItem
        key={entry.dt}
        Hour={entry}
        UnitSystem={UnitSystem}
      ></HourlyForecastItem>
    )
  })

  let hourly = getHourlyStyle(Colors._z)

  return (
    <View style={hourly.hourlySection}>
      <View style={hourly.hourHeaderWrapper}>
        <View style={hourly.statLeft}>
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

async function getFormattedHours(dtTxt, setTimeVariables) {
  let hour = getHour(dtTxt)
  let identifier

  await getTimeFormat().then((format) => {
    if (format === '12-Hour') {
      hour = hour % 12 === 0 ? 12 : hour % 12
      identifier = hour < 12 ? 'am' : 'pm'
    }

    setTimeVariables({ hour: hour, identifier: identifier })
  })
}

function HourlyForecastItem({ Hour, UnitSystem }) {
  const [TimeVariables, setTimeVariables] = useState()

  useEffect(() => {
    getFormattedHours(Hour.dt_txt, setTimeVariables)
  }, [])

  let hourly = getHourlyStyle(Colors._z)

  return (
    <View style={hourly.hourWrapper}>
      <View style={hourly.statLeft}>
        <Stat
          Stat={
            TimeVariables != undefined
              ? TimeVariables.hour
              : getHour(Hour.dt_txt)
          }
          Unit={TimeVariables != undefined ? TimeVariables.identifier : null}
          Size={22}
        ></Stat>
      </View>

      <View style={hourly.statCenter}>
        <WeatherIcon
          style={hourly.icon}
          Condition={Hour.weather[0].icon}
        ></WeatherIcon>
      </View>

      <View style={hourly.statRight}>
        <Stat
          Stat={Hour.wind.speed.toFixed(1)}
          Unit={UnitSystem.speed}
          Size={20}
        ></Stat>
      </View>

      <View style={hourly.statRight}>
        <Stat
          Stat={Math.round(Hour.main.temp)}
          Unit={UnitSystem.temp}
          Size={20}
        ></Stat>
      </View>

      <View style={hourly.statRight}>
        <Stat Stat={(Hour.pop * 100).toFixed(0)} Unit={'%'} Size={20}></Stat>
      </View>
    </View>
  )
}

function getHourlyStyle(colors) {
  return StyleSheet.create({
    hourlySection: {
      backgroundColor: colors.pressable,
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
      borderBottomColor: colors.text10,
      borderBottomWidth: 1,
      paddingVertical: 4,
    },
    icon: {
      width: 28,
      height: 28,
      tintColor: colors.text
    },
    hourHeaderWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: colors.text30,
      borderBottomWidth: 2,
      paddingVertical: 4,
      marginBottom: 8,
    },
    headerLabel: {
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 4,
      minWidth: 40,
    },
    statLeft: {
      minWidth: 68,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    statRight: {
      minWidth: 68,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    statCenter: {
      minWidth: 68,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}

export function WeeklySection({ Weather, UnitSystem }) {
  let weekly = getWeeklyStyle(Colors._z)

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
          UnitSystem={UnitSystem}
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

function WeeklyListItem({ Weather, Day, UnitSystem }) {
  let weekday = getDay(Day)

  let weekly = getWeeklyStyle(Colors._z)

  return (
    <View style={weekly.card}>
      <Font style={weekly.day}>{weekdays[weekday % 7]}</Font>

      <WeatherIcon
        Condition={Weather.weather[0].icon}
        style={weekly.icon}
      ></WeatherIcon>

      <Stat
        Stat={Math.round(Weather.temp.max)}
        Unit={UnitSystem.temp}
        Size={18}
      ></Stat>
      <Stat
        Stat={Math.round(Weather.temp.min)}
        Unit={UnitSystem.temp}
        Size={18}
      ></Stat>
    </View>
  )
}

function getWeeklyStyle(colors) {
  return StyleSheet.create({
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

      backgroundColor: colors.pressable,
      borderRadius: 8,

      height: 'auto',
    },
    day: {
      fontSize: 20,
      fontWeight: '500',
      textTransform: 'uppercase',
    },
    icon: {
      width: 28,
      height: 28,
      marginVertical: 8,
      tintColor: colors.text
    },
  })
}
