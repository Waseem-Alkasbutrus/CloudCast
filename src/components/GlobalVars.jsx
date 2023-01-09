import AsyncStorage from '@react-native-async-storage/async-storage'

async function getColors() {
  let scheme = await AsyncStorage.getItem('ColorScheme')
  
  if (scheme == undefined) {
    scheme = 'Light'
    await AsyncStorage.setItem('ColorScheme', scheme)
  }

  const DarkTheme = {
    gradient: ['#483B99', '#3D1186'],
    pressable: '#B78AFF0F',
    button: '#B78AFF20',
    text: '#DCDFFF',
    text30: '#DCDFFF30',
    text10: '#DCDFFF10',
    navbar: '#2E135A',
    activeTab: '#B78AFF33',
    bg: '#21212170',
  }

  const LightTheme = {
    gradient: ['#BC7EE1', '#9E5DDE'],
    pressable: '#FD9BFF15',
    button: '#FD9BFF25',
    text: '#FBFBFB',
    text30: '#FBFBFB30',
    text10: '#FBFBFB10',
    navbar: '#854DC2',
    activeTab: '#9D5DCE',
    bg: '#21212170',
  }

  let colors = LightTheme
  if (scheme === 'Dark') {
    colors = DarkTheme
  }

  return colors
}

export const Colors = getColors()

export async function getUnitSystem() {
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

export function saveVar(key, newValue) {
  try {
    AsyncStorage.setItem(key, newValue)
  } catch (e) {
    console.err(e)
  }
}