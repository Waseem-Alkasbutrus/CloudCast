import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SearchScreen from '../screens/SearchScreen'
import CityScreenStack from './CityScreenStack'

const Tab = createBottomTabNavigator()

const active = '#00C2FF'
const inactive = '#5F5F5F'

function Home() {
  return <CityScreenStack MainScreen={HomeScreen}></CityScreenStack>
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      defaultScreenOptions={'Home'}
      screenOptions={{
        tabBarStyle: { height: 64, padding: 8 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          showIcon: true,
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="home"
                size={24}
                color={tabInfo.focused ? active : inactive}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          showIcon: true,
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="search"
                size={24}
                color={tabInfo.focused ? active : inactive}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          showIcon: true,
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="settings"
                size={24}
                color={tabInfo.focused ? active : inactive}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
