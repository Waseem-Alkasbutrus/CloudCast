import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { SafeAreaScreenWrapper, ScreenWrapper } from '../components/ScreenWrapper'

import Stat from '../components/IconStat'
import { HourlySection, WeeklySection } from '../components/ForecastItem'
import { getWeatherIconPath } from '../components/WeatherIcon'

export default function CityScreen({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({ title: route.params.Weather.city.name })
  }, [])

  return (
    <SafeAreaScreenWrapper>
      <Details Weather={route.params.Weather}></Details>

      <WeeklySection Lat={route.params.Weather.city.coord.lat} Lon={route.params.Weather.city.coord.lon}></WeeklySection>

      <HourlySection Weather={route.params.Weather}></HourlySection>
    </SafeAreaScreenWrapper>
  )
}

function Details({ Weather }) {
  return (
    <View style={details.cardView}>
      <View style={details.flexRow}>
        <View style={details.temp}>
          <Stat
            Stat={Math.round(Weather.list[0].main.temp)}
            Unit="f"
            Size={120}
            Weight={'420'}
          />
        </View>

        <View style={[details.flexCol, details.highLowTempsWrapper]}>
          <Stat
            Size={32}
            Stat={Math.round(Weather.list[0].main.temp_max)}
            Unit="f"
          />
          <Stat
            Size={32}
            Stat={Math.round(Weather.list[0].main.temp_min)}
            Unit="f"
          />
        </View>
      </View>

      <View style={details.desc}>
        <Stat Icon={getWeatherIconPath(Weather.list[0].weather[0].icon)} Stat={Weather.list[0].weather[0].description} Size={20}></Stat>
      </View>

      <View style={details.flexRow}>
        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={18}
          Stat={Weather.list[0].pop * 100}
          Unit="%"
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Feels-Like.png')}
          Size={18}
          Stat={Math.round(Weather.list[0].main.feels_like)}
          Unit="f"
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Wind.png')}
          Size={18}
          Stat={Weather.list[0].wind.speed}
          Unit="mph"
        />

        <View style={details.divider} />

        <Stat
          Icon={require('../../assets/icons/Humidity.png')}
          Size={18}
          Stat={Weather.list[0].main.humidity}
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
    marginTop: 62
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