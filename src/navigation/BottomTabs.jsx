import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SearchScreen from '../screens/SearchScreen'
import CityScreenStack from './CityScreenStack'
import { Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Font from '../components/Font'
import { Colors } from '../components/GlobalVars'

const Tab = createBottomTabNavigator()

function Home() {
  return <CityScreenStack MainScreen={HomeScreen}></CityScreenStack>
}

function Search() {
  return <CityScreenStack MainScreen={SearchScreen}></CityScreenStack>
}

function CustomTab(icon, label, focused) {
  let colors = Colors._z
  let transparentText = colors.text + '80'

  return (
    <LinearGradient
      colors={focused ? colors.gradient : ['#00000000', '#00000000']}
      style={tabStyles.tabWrapper}
    >
      <Image
        source={icon}
        style={focused ? tabStyles.focusedIcon : tabStyles.unfocusedIcon}
      ></Image>
      <Font style={focused? [tabStyles.label, {color: colors.text}] : [tabStyles.label, {color: transparentText}]}>
        {label}
      </Font>
    </LinearGradient>
  )
}

const tabStyles = StyleSheet.create({
  tabWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  focusedIcon: {
    height: 32,
    width: 32,
    opacity: 1,
    alignSelf: 'center'
  },
  unfocusedIcon: {
    height: 32,
    width: 32,
    opacity: 0.5,
    alignSelf: 'center'
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
  }
})

export default function BottomTabs() {
  return (
    <Tab.Navigator
      defaultScreenOptions={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors._z.navbar,
          position: 'absolute',
          borderTopWidth: 0,
          height: 72,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          showIcon: true,
          tabBarIcon: (tabInfo) => {
            return CustomTab(
              require('../../assets/icons/Home.png'),
              'Home',
              tabInfo.focused,
            )
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: (tabInfo) => {
            return CustomTab(
              require('../../assets/icons/Search.png'),
              'Search',
              tabInfo.focused,
            )
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabelStyle: {
            marginBottom: 8,
          },
          tabBarIcon: (tabInfo) => {
            return CustomTab(
              require('../../assets/icons/Settings.png'),
              'Settings',
              tabInfo.focused,
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
