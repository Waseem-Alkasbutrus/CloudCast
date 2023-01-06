import AsyncStorage from '@react-native-async-storage/async-storage'

async function getColors() {
  if (scheme == undefined) {
    scheme = 'Dark'
    await AsyncStorage.setItem('ColorScheme', scheme)
  }
  let scheme = await AsyncStorage.getItem('ColorScheme')

  const DarkTheme = {
    gradient: ['#594DA0', '#330976'],
    pressable: '#39393916',
    button: '#39393920',
    text: '#DCDFFF',
    navbar: '#2E135A',
  }

  const LightTheme = {
    gradient: ['#FF7B7B', '#E35F9F'],
    pressable: '#39393916',
    button: '#39393920',
    text: '#FBFBFB',
    navbar: '#A04B71',
  }

  let colors = LightTheme
  if (scheme === 'Dark') {
    colors = DarkTheme
  }

  return colors
}

export const Colors = getColors()

async function getUnitSystem() {
  let units = await AsyncStorage.getItem('Units')

  if (units == undefined) {
    units = 'imperial'
    await AsyncStorage.setItem('Units', units)
  }

  let imperial = {
    units: units,
    temp: 'f',
    speed: 'mph',
  }

  let metric = {
    units: units,
    temp: 'c',
    speed: 'm/s',
  }

  let unitSystem = imperial
  if (units === 'metric') {
    unitSystem = metric
  }

  return unitSystem
}

export const UnitSystem = getUnitSystem()
