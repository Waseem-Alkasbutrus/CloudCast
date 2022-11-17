import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TitledSection({children, Label}) {
    return (
        <View style={styles.homeContainer}>
            <Text style={styles.heading}>{Label}</Text>
            <View style={styles.contentContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
      padding: 8,
      backgroundColor: '#F7F7F7',
    },
  
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
  
    heading: {
      fontSize: 20,
      fontWeight: '500',

      marginVertical: 8,
    },
  })