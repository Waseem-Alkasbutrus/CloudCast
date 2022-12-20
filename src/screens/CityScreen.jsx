import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CityDetailedItem from '../components/CityDetailedItem'
import TitledSection from '../components/TitledSection'

export default function CityScreen({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({title: route.params.Weather.name})
  }, [])

  return (
    <SafeAreaView style={styles.cityContainer}>
      <CityDetailedItem Weather={route.params.Weather}></CityDetailedItem>

      <View style={weekly.section}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <WeeklyListItem></WeeklyListItem>
          <WeeklyListItem></WeeklyListItem>
          <WeeklyListItem></WeeklyListItem>
          <WeeklyListItem></WeeklyListItem>
          <WeeklyListItem></WeeklyListItem>
          <WeeklyListItem></WeeklyListItem>
          <WeeklyListItem></WeeklyListItem>
        </ScrollView>
      </View>

      <TitledSection Label={'Hourly Forecast'}>
        <Text>Forecast each hour I guess</Text>
      </TitledSection>
    </SafeAreaView>
  )
}

function WeeklyListItem() {
  return (
    <View style={weekly.card}>
      <Text style={weekly.day}>Tue</Text>
      <Text style={weekly.temp}>80 f</Text>
      <Text style={weekly.temp}>70 f</Text>
    </View>
  )
}

const weekly = StyleSheet.create({
  section: {
    display: 'flex',
    gap: 8,
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

    backgroundColor: 'white',
    borderRadius: 8,

    height: 'auto',
  },
  day: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 6,
  },
  temp: {
    fontSize: 16,
  },
})

const styles = StyleSheet.create({
  cityContainer: {
    backgroundColor: '#F7F7F7',
    flexGrow: 1,
  },
})
