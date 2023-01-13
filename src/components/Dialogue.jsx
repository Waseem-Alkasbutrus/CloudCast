import { Image, StyleSheet, View } from 'react-native'
import { PrimaryButton, SecondaryButton } from './Button'
import Font from './Font'
import { Colors } from './GlobalVars'

export function OkCancelButtons({
  Ok = {
    label: 'Ok',
    action: () => {
      console.log('Ok')
    },
  },
  Cancel = {
    label: 'Cancel',
    action: () => {
      console.log('Cancel')
    },
  },
}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <PrimaryButton
        style={{ paddingHorizontal: 16 }}
        Label={Ok.label}
        Action={Ok.action}
      ></PrimaryButton>
      <SecondaryButton
        Action={Cancel.action}
        Label={Cancel.label}
        style={{ marginLeft: 8 }}
      ></SecondaryButton>
    </View>
  )
}

export function Warning({ Title, Content, Ok, Cancel }) {
  let warning = getWarningStyle(Colors._z)

  return (
    <View style={warning.wrapper}>
      <View style={warning.header}>
        <Image
          style={warning.icon}
          source={require('../../assets/icons/Warning.png')}
        />
        <Font style={warning.title}>{Title}</Font>
      </View>
      <Font style={warning.content}>{Content}</Font>
      <OkCancelButtons Ok={Ok} Cancel={Cancel}></OkCancelButtons>
    </View>
  )
}

function getWarningStyle(colors) {
  return StyleSheet.create({
    wrapper: {
        
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 8,
      tintColor: colors.text,
    },
    title: {
      fontSize: 22,
    },
    content: {
      paddingHorizontal: 8,
      fontSize: 16,
      marginBottom: 16,
    },
  })
}
