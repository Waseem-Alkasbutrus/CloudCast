import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Font from './Font'

import Stat from './IconStat'

export default function CityDetailedItem({
  Weather,
  Action = () => {
    console.log(Weather)
  },
}) {
  
  return (
    <Pressable onPress={Action} style={style.cardView}>
      <Font style={style.cardTitle}>{Weather.city.name}</Font>

      <View style={style.flexRow}>
        <View style={style.temp}>
          <Stat
            Stat={Math.round(Weather.list[0].main.temp)}
            Unit="f"
            Size={120}
            Weight={'420'}
          />
        </View>

        <View style={[style.flexCol, style.highLowTempsWrapper]}>
          <Stat Size={32} Stat={Math.round(Weather.list[0].main.temp_max)} Unit="f" />
          <Stat Size={32} Stat={Math.round(Weather.list[0].main.temp_min)} Unit="f" />
        </View>
      </View>

      <View style={style.flexRow}>
        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={18}
          Stat={Weather.list[0].pop * 100}
          Unit='%'
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Feels-Like.png')}
          Size={18}
          Stat={Math.round(Weather.list[0].main.feels_like)}
          Unit='f'
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Wind.png')}
          Size={18}
          Stat={Weather.list[0].wind.speed.toFixed(1)}
          Unit='mph'
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Humidity.png')}
          Size={18}
          Stat={Weather.list[0].main.humidity}
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
