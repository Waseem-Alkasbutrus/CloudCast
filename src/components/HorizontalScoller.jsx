import react from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HorizontalScroller() {
  return (
    <View style={styles.hScroller}>
      <Text>horizonal scroller</Text>
      <Text>horizonal scroller</Text>
      <Text>horizonal scroller</Text>

      <Text>horizonal scroller</Text>
      <Text>horizonal scroller</Text>
      <Text>horizonal scroller</Text>
      <Text>horizonal scroller</Text>
      <Text>horizonal scroller</Text>
      <Text>horizonal scroller</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  hScroller: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
  },
})
