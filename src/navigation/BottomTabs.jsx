import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SearchScreen from '../screens/SearchScreen'
import CityScreenStack from './CityScreenStack'
import { Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Font from '../components/Font'

const Tab = createBottomTabNavigator()

const active = '#FBFBFB'
const inactive = '#FBFBFB50'

function Home() {
  return <CityScreenStack MainScreen={HomeScreen}></CityScreenStack>
}

function Search() {
  return <CityScreenStack MainScreen={SearchScreen}></CityScreenStack>
}

function CustomTab(icon, label, focused) {
  return (
    <LinearGradient
      colors={focused ? ['#FF7B7B', '#E35F9F'] : ['#00000000', '#00000000']}
      style={tabStyles.tabWrapper}
    >
      <Image
        source={icon}
        style={focused ? tabStyles.focusedIcon : tabStyles.unfocusedIcon}
      ></Image>
      <Font style={focused ? tabStyles.focusedLabel : tabStyles.unfocusedLabel}>
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
  focusedLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: active,
  },
  unfocusedLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: inactive,
  },
})

export default function BottomTabs() {
  return (
    <Tab.Navigator
      defaultScreenOptions={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#A04B71',
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
