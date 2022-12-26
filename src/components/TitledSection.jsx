import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Font from './Font'

export default function TitledSection({children, Label}) {
    return (
        <View style={styles.homeContainer}>
            <Font style={styles.heading}>{Label}</Font>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
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
      fontSize: 18,
      fontWeight: '400',
      color: '#FBFBFB',
    },
  })