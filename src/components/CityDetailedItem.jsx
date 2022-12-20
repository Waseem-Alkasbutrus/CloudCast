import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import Stat from './IconStat'

function defaultWeather() {
  return JSON.parse('{"coord":{"lon":96.727,"lat":33.006},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":6.64,"feels_like":-2.22,"temp_min":6.64,"temp_max":6.64,"pressure":1016,"humidity":21,"sea_level":1016,"grnd_level":561},"visibility":10000,"wind":{"speed":4.65,"deg":290,"gust":4.45},"clouds":{"all":100},"dt":1671477417,"sys":{"country":"CN","sunrise":1671496282,"sunset":1671532174},"timezone":28800,"id":1280653,"name":"Machang","cod":200}')
}

export default function CityDetailedItem({
  Weather=defaultWeather(),
  Action = () => {
    console.log(Weather)
  },
}) {

  return (
    <Pressable onPress={Action} style={style.cardView}>
      <Text style={style.cardTitle}>{Weather.name}</Text>

      <View style={style.flexRow}>
        <Stat
          Icon={require('../../assets/icons/Thermometer.png')}
          Stat={Weather.main.temp + ' f'}
          Size={40}
          Weight={'420'}
        />

        <View style={style.flexCol}>
          <Stat Size={20} Stat={Weather.main.temp_max + ' f'} />
          <Stat Size={20} Stat={Weather.main.temp_min + ' f'} />
        </View>
      </View>

      <View style={style.flexRow}>
        <View style={style.flexCol}>
          <Stat
            Icon={require('../../assets/icons/Wind.png')}
            Size={20}
            Stat={Weather.wind.speed + ' mph'}
          />
          <Stat
            Icon={require('../../assets/icons/Pressure.png')}
            Size={20}
            Stat={Weather.main.pressure + ' hPa'}
          />
        </View>

        <View style={style.divider} />

        <View style={style.flexCol}>
          <Stat
            Icon={require('../../assets/icons/Humidity.png')}
            Size={20}
            Stat={Weather.main.humidity + '%'}
          />
          <Stat
            Icon={require('../../assets/icons/Air-Quality.png')}
            Size={20}
            Stat={'100'}
          />
        </View>

        <View style={style.divider} />

        <View style={style.flexCol}>
          <Stat
            Icon={require('../../assets/icons/Rain-Shower.png')}
            Size={20}
            Stat={'10 %'}
          />
          <Stat
            Icon={require('../../assets/icons/UV.png')}
            Size={20}
            Stat={'0.4'}
          />
        </View>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    paddingHorizontal: 8,
    paddingVertical: 16,

    margin: 8,

    backgroundColor: '#ffffff',
    borderRadius: 10,
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',

    marginVertical: 4,

    alignItems: 'center',
    justifyContent: 'space-between',
  },

  flexCol: {
    display: 'flex',
    flexDirection: 'column',

    marginRight: 4,

    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '500',
  },

  divider: {
    borderColor: '#000000',
    borderWidth: 0.2,
    marginHorizontal: 8,
    height: '32%',
  },
})
