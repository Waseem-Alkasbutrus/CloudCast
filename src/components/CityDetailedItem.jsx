import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import Stat from './IconStat'

export default function CityDetailedItem({ CityName, Action = () => {console.log("press")} }) {
  return (
    <Pressable onPress={Action} style={style.cardView}>
      <Text style={style.cardTitle}>{CityName}</Text>

      <View style={style.flexRow}>
        <Stat Icon={require('../../assets/icons/Thermometer.svg')} Stat={'75 f'} Size={32} Weight={'420'}/>

        <View style={style.divider} />

        <View style={style.flexCol}>
          <Stat Stat={'84 f'} />
          <Stat Stat={'69 f'} />
        </View>
      </View>

      <View style={style.flexRow}>
        <View style={style.flexCol}>
          <Stat Icon={require('../../assets/icons/Wind.svg')} Stat={'10 mph'} />
          <Stat Icon={require('../../assets/icons/Pressure.svg')} Stat={'1 atm'} />
        </View>

        <View style={style.divider} />

        <View style={style.flexCol}>
          <Stat Icon={require('../../assets/icons/Humidity.svg')} Stat={'20 %'} />
          <Stat Icon={require('../../assets/icons/Air-Quality.svg')} Stat={'100'} />
        </View>

        <View style={style.divider} />

        <View style={style.flexCol}>
          <Stat Icon={require('../../assets/icons/Rain-Shower.svg')} Stat={'10 %'} />
          <Stat Icon={require('../../assets/icons/UV.svg')} Stat={'0.4'} />
        </View >
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

  flexRow : {
    display: 'flex',
    flexDirection: 'row',

    marginVertical: 4,

    alignItems: 'center',
    justifyContent: 'space-between'
  },

  flexCol: {
    display: 'flex',
    flexDirection: 'column',

    marginRight: 4,

    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },

  cardTitle :{
    fontSize: 20,
    fontWeight: '500',
  },

  divider: {
    borderColor: '#000000',
    borderWidth: 1,
    marginHorizontal: 8,
  }
})
