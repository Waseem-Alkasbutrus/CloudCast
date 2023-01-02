import react from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import Stat from './IconStat'
import Font from './Font'

export function HourlySection({ Weather }) {
  // console.log(Weather)

  let hourlyForecast = Weather.list.map((entry) => {
    return <HourlyForecastItem key={entry.dt} Hour={entry}></HourlyForecastItem>
  })

  return (
    <View style={hourly.hourlySection}>
      <View style={hourly.hourHeaderWrapper}>
        <View style={hourly.stat}>
          <Font style={hourly.headerLabel}>Time</Font>
        </View>

        <View style={hourly.stat}></View>

        <View style={hourly.stat}>
          <Font style={hourly.headerLabel}>Wind</Font>
        </View>
        <View style={hourly.stat}>
          <Font style={hourly.headerLabel}>Temp</Font>
        </View>
        <View style={hourly.stat}>
          <Font style={hourly.headerLabel}>Rain</Font>
        </View>
      </View>

      <ScrollView>{hourlyForecast}</ScrollView>
    </View>
  )
}

function convert(dtTxt) {
  const dt = new Date(dtTxt.replace(' ', 'T'))
  const hr = dt.getHours()

  return hr
}

function HourlyForecastItem({ Hour }) {
  let hour = convert(Hour.dt_txt)
  let identifier = hour < 12 ? 'am' : 'pm'

  return (
    <View style={hourly.hourWrapper}>
      <View style={hourly.stat}>
        <Stat
          Stat={hour % 12 === 0 ? 12 : hour % 12}
          Unit={identifier}
          Size={22}
        ></Stat>
      </View>

      <View style={hourly.stat}>
        <Image
          style={hourly.icon}
          source={require('../../assets/icons/weather/01.png')}
        ></Image>
      </View>

      <View style={hourly.stat}>
        <Stat Stat={Hour.wind.speed.toFixed(1)} Unit={'mph'} Size={20}></Stat>
      </View>

      <View style={hourly.stat}>
        <Stat Stat={Math.round(Hour.main.temp)} Unit={'f'} Size={20}></Stat>
      </View>

      <View style={hourly.stat}>
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
    justifyContent: 'space-between',
    borderBottomColor: '#FBFBFB15',
    borderBottomWidth: 1,
    marginBottom: 4,
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
  stat: {
    minWidth: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export function WeeklySection({ Weather }) {
  return (
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
  )
}

function WeeklyListItem() {
  return (
    <View style={weekly.card}>
      <Font style={weekly.day}>Tue</Font>
      <Image
        style={weekly.icon}
        source={require('../../assets/icons/Clear-Sky.png')}
      ></Image>
      <Stat Stat={80} Unit="f" Size={18}></Stat>
      <Stat Stat={70} Unit="f" Size={18}></Stat>
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
