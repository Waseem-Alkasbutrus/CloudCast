import react from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CityScreen from '../screens/CityScreen'

const Stack = createStackNavigator()

export default function CityScreenStack({ MainScreen }) {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="City" component={CityScreen} />
    </Stack.Navigator>
  )
}
