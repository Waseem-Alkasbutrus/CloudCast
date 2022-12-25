import React from 'react'
import { Button, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import {} from 'react-native-safe-area-context'
import Font from '../components/Font'
import ScreenWrapper from '../components/ScreenWrapper'
import TitledSection from '../components/TitledSection.jsx'

export default function SearchScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a city..."
          placeholderTextColor={'#FBFBFB50'}
        ></TextInput>

        <Pressable
          style={styles.searchButton}
          onPress={() => console.log('Search')}
        >
          <Image
            style={styles.searchIcon}
            source={require('../../assets/icons/Search.png')}
          ></Image>
        </Pressable>
      </View>

      <TitledSection Label="Featured Cities">
        <Text>City1</Text>
        <Text>City1</Text>
        <Text>City1</Text>
        <Text>City1</Text>
      </TitledSection>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
    flexDirection: 'row',

    marginVertical: 4,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 8,
    backgroundColor: '#21212120',
  },
  searchInput: {
    color: '#FBFBFB',
    fontSize: 16,

    flexGrow: 1,
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  searchIcon: {
    flexGrow: 1,
    width: 24,
    height: 24,
  },
})
