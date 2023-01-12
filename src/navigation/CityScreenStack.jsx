import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { Button, Easing, Image, StyleSheet, View } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Font from '../components/Font'
import { Colors } from '../components/GlobalVars'

import CityScreen from '../screens/CityScreen'

const Stack = createStackNavigator()

function getHeaderStyle(colors) {
  return StyleSheet.create({
    header: {
      backgroundColor: '#00000000',
    },
    title: {
      fontFamily: 'SpaceGrotesk',
      fontSize: 24,
      fontWeight: '500',
    },
    button: {
      backgroundColor: colors.button,
      borderRadius: 16,
      marginVertical: 8,
      marginLeft: 16,
      paddingHorizontal: 8,
      paddingVertical: 10,
    },
    buttonIcon: {
      width: 32,
      height: 28,
      tintColor: colors.text
    },
  })
}

function CustomHeaderTitle(props) {
  let header = getHeaderStyle(Colors._z)

  return (
    <View style={header.header}>
      <Font style={header.title}>{props.children}</Font>
    </View>
  )
}

function CustomHeaderBackButton(props) {
  let header = getHeaderStyle(Colors._z)

  return (
    <Pressable style={header.button} onPress={props.onPress}>
      <Image
        style={header.buttonIcon}
        source={require('../../assets/icons/Back-Arrow.png')}
      />
    </Pressable>
  )
}

const animConfig = {
  bounce: {
    animation: 'timing',
    config: {
      duration: 500,
      easing: Easing.in(Easing.bounce),
    },
  },
  slide: {
    animation: 'timing',
    config: {
      duration: 150,
      easing: Easing.inOut(Easing.linear),
    },
  },
}

export default function CityScreenStack({ MainScreen }) {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerMode: 'screen',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: animConfig.slide,
          close: animConfig.slide,
        },
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
