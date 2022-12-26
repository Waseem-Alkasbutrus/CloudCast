import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Font from './Font'

import Stat from './IconStat'

function defaultWeather() {
  return JSON.parse(
    '{"coord":{"lon":96.727,"lat":33.006},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":6.64,"feels_like":-2.22,"temp_min":6.64,"temp_max":6.64,"pressure":1016,"humidity":21,"sea_level":1016,"grnd_level":561},"visibility":10000,"wind":{"speed":4.65,"deg":290,"gust":4.45},"clouds":{"all":100},"dt":1671477417,"sys":{"country":"CN","sunrise":1671496282,"sunset":1671532174},"timezone":28800,"id":1280653,"name":"Machang","cod":200}',
  )
}

export default function CityDetailedItem({
  Weather = defaultWeather(),
  Action = () => {
    console.log(Weather)
  },
}) {
  return (
    <Pressable onPress={Action} style={style.cardView}>
      <Font style={style.cardTitle}>{Weather.name}</Font>

      <View style={style.flexRow}>
        <View style={style.temp}>
          <Stat
            Stat={Math.round(Weather.main.temp)}
            Unit="f"
            Size={120}
            Weight={'420'}
          />
        </View>

        <View style={[style.flexCol, style.highLowTempsWrapper]}>
          <Stat Size={32} Stat={Math.round(Weather.main.temp_max)} Unit="f" />
          <Stat Size={32} Stat={Math.round(Weather.main.temp_min)} Unit="f" />
        </View>
      </View>

      <View style={style.flexRow}>
        <Stat
          Icon={require('../../assets/icons/Wind.png')}
          Size={18}
          Stat={Weather.wind.speed}
          Unit='mph'
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={18}
          Stat={'10'}
          Unit='%'
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Wind.png')}
          Size={18}
          Stat={Weather.wind.speed}
          Unit='mph'
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Humidity.png')}
          Size={18}
          Stat={Weather.main.humidity}
          Unit='%'
        />
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

    backgroundColor: '#39393924',
    borderRadius: 10,
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',

    marginVertical: 4,

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

  cardTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FBFBFB',
  },

  divider: {
    borderColor: '#FBFBFB',
    borderWidth: 0.2,
    marginHorizontal: 8,
    height: '32%',
  },
})
