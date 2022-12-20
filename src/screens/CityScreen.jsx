import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import CityListItem from '../components/CityListItem'
import CityDetailedItem from '../components/CityDetailedItem'
import TitledSection from '../components/TitledSection'
import HorizontalScroller from '../components/HorizontalScoller'

export default function CityScreen({route}) {

  console.log(route.params)

  return (
    <View style={style.cityContainer}>
      <CityDetailedItem Weather={route.params.Weather}></CityDetailedItem>

      <HorizontalScroller>
       <WeeklyListItem></WeeklyListItem>
       <WeeklyListItem></WeeklyListItem>
       <WeeklyListItem></WeeklyListItem>
      </HorizontalScroller>

      <TitledSection Label={'Hourly Forecast'}>
        <Text>Forecast each hour I guess</Text>
      </TitledSection>
    </View>
  )
}

function WeeklyListItem() {
  return (
    <View>
      <Text>Tue</Text>
      <Text>80 f</Text>
      <Text>70 f</Text>
    </View>
  )
}

const style = StyleSheet.create({
  cityContainer: {
    backgroundColor: '#F7F7F7',
    flexGrow: 1
  },
})
