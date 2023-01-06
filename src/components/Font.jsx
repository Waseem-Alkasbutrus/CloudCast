import { Text, StyleSheet } from 'react-native'
import { Colors } from './GlobalVars'

export default function Font({ children, style }) {
  let color = Colors._z.text

  return (
    <Text style={[{ color: color, fontFamily: 'SpaceGrotesk' }, style]}>
      {children}
    </Text>
  )
}
