import { createStackNavigator } from '@react-navigation/stack'
import { Button, Image, StyleSheet, View } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Font from '../components/Font'

import CityScreen from '../screens/CityScreen'

const Stack = createStackNavigator()

const header = StyleSheet.create({
  header: {
    backgroundColor: '#00000000',
  },
  title: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 24,
    fontWeight: '500',
    color: '#FBFBFB',
  },
  button: {
    backgroundColor: '#21212120',
    borderRadius: 360,
    marginVertical: 8,
    marginLeft: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  buttonIcon: {
    width: 32,
    height: 28,
  },
})

function CustomHeaderTitle(props) {
  return (
    <View style={header.header}>
      <Font style={header.title}>{props.children}</Font>
    </View>
  )
}

function CustomHeaderBackButton(props) {
  console.log(props)
  return (
    <Pressable style={header.button} onPress={props.onPress}>
      <Image
        style={header.buttonIcon}
        source={require('../../assets/icons/Back-Arrow.png')}
      />
    </Pressable>
  )
}

export default function CityScreenStack({ MainScreen }) {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#FF7B7B' },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="City"
        component={CityScreen}
        options={{
          headerTitle: (props) => <CustomHeaderTitle {...props} />,
          headerLeft: (props) => <CustomHeaderBackButton {...props} />,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}
