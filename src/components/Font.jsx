import { Text, StyleSheet } from 'react-native'

export default function Font({ children, style }) {
  return <Text style={[style, fontFam.spaceGrotesk]}>{children}</Text>
}

const fontFam=StyleSheet.create({
    spaceGrotesk: {
        fontFamily: 'SpaceGrotesk'
    }
})
