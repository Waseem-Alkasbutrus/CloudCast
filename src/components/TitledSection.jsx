import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default function TitledSection({children, Label}) {
    return (
        <View style={styles.homeContainer}>
            <Text style={styles.heading}>{Label}</Text>
            <ScrollView style={styles.contentContainer}>
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
      padding: 8,
    },
  
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
  
    heading: {
      fontSize: 16,
      fontWeight: '400',
      color: '#FBFBFB',

      marginVertical: 8,
    },
  })