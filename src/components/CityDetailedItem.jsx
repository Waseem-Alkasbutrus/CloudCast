import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import Font from './Font'
import { Colors } from './GlobalVars'

import Stat from './IconStat'

export default function CityDetailedItem({
  Weather,
  UnitSystem,
  Action = () => {
    console.log(Weather)
  },
}) {
  let style = getStyle(Colors._z)

  return (
    <Pressable onPress={Action} style={style.cardView}>
      <Font style={style.cardTitle}>{Weather.city.name}</Font>

      <View style={style.flexRow}>
        <View style={style.temp}>
          <Stat
            Stat={Math.round(Weather.list[0].main.temp)}
            Unit={UnitSystem.temp}
            Size={135}
            Weight={'420'}
          />
        </View>

        <View style={[style.flexCol, style.highLowTempsWrapper]}>
          <Stat
            Size={32}
            Stat={Math.round(Weather.list[0].main.temp_max)}
            Unit={UnitSystem.temp}
          />
          <Stat
            Size={32}
            Stat={Math.round(Weather.list[0].main.temp_min)}
            Unit={UnitSystem.temp}
          />
        </View>
      </View>

      <View style={style.flexRow}>
        <Stat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Size={18}
          Stat={(Weather.list[0].pop * 100).toFixed(0)}
          Unit="%"
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Feels-Like.png')}
          Size={18}
          Stat={Math.round(Weather.list[0].main.feels_like)}
          Unit={UnitSystem.temp}
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Wind.png')}
          Size={18}
          Stat={Weather.list[0].wind.speed.toFixed(1)}
          Unit={UnitSystem.speed}
        />

        <View style={style.divider} />

        <Stat
          Icon={require('../../assets/icons/Humidity.png')}
          Size={18}
          Stat={Weather.list[0].main.humidity}
          Unit="%"
        />
      </View>
    </Pressable>
  )
}

function getStyle(colors) {
  return StyleSheet.create({
    cardView: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      paddingHorizontal: 8,
      paddingVertical: 16,

      margin: 8,

      backgroundColor: colors.pressable,
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
      flexGrow: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginBottom: -16,
    },

    highLowTempsWrapper: {
      display: 'flex',
      flexDirection: 'column',

      flexGrow: 1,
      height: 100,

      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },

    cardTitle: {
      fontSize: 22,
      fontWeight: '500',
    },

    divider: {
      marginHorizontal: 10,
      height: '32%',
    },
  })
}
