import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SearchScreen from '../screens/SearchScreen'

const Tab = createBottomTabNavigator()

const active = '#00C2FF'
const inactive = '#5F5F5F'

export default function BottomTabs() {
  return (
    <Tab.Navigator
      defaultScreenOptions={'Home'}
      screenOptions={{
        tabBarStyle: { height: 64, padding: 8, },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          showIcon: true,
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
