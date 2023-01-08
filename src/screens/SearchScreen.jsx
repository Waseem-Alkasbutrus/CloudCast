import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaScreenWrapper } from '../components/ScreenWrapper'
import TitledSection from '../components/TitledSection.jsx'

import { API_KEY } from '@env'
import Font from '../components/Font'
import { CitySearchListItem } from '../components/CityListItem'
import { Colors } from '../components/GlobalVars'

async function searchFor(city, setResults, navigation) {
  await fetch(
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
      city +
      '&limit=16&appid=' +
      API_KEY,
  )
    .then((res) => res.json())
    .then((res) => {
      try {
        let results

        if (res.length > 0) {
          results = res.map((city) => {
            return (
              <CitySearchListItem
                key={city.lat * city.lon}
                City={city}
                Action={() => {
                  navigation.navigate('City', {
                    CityName: city.name,
                    Lon: city.lon,
                    Lat: city.lat,
                  })
                }}
              ></CitySearchListItem>
            )
          })
        } else {
          results = [
            <Font key="emptySearch" style={getStyle(Colors._z).emptySearch}>
              no matching cities...
            </Font>,
          ]
        }

        setResults(
          <TitledSection Label="Search Results">{results}</TitledSection>,
        )
      } catch (e) {
        console.error(e)
      }
    })
}

export default function SearchScreen({ navigation }) {
  const [searchCity, setSearchCity] = useState()
  const [searchResults, setSearchResults] = useState([])

  let colors = Colors._z
  let styles = getStyle(colors)

  return (
    <SafeAreaScreenWrapper>
      <View style={styles.searchBar}>
        <TextInput
          autoFocus={true}
          style={styles.searchInput}
          placeholder="Search for a city..."
          placeholderTextColor={colors.text + '80'}
          returnKeyType="search"
          onChangeText={(newText) => setSearchCity(newText)}
          onSubmitEditing={() => {
            searchFor(searchCity, setSearchResults, navigation)
          }}
        ></TextInput>

        <Pressable
          style={styles.searchButton}
          onPress={() => searchFor(searchCity, setSearchResults, navigation)}
        >
          <Image
            style={styles.searchIcon}
            source={require('../../assets/icons/Search.png')}
          ></Image>
        </Pressable>
      </View>

      {searchResults}
    </SafeAreaScreenWrapper>
  )
}

function getStyle(colors) {
  return StyleSheet.create({
    searchBar: {
      display: 'flex',
      flexDirection: 'row',

      marginVertical: 4,
      marginHorizontal: 16,
      paddingHorizontal: 8,
      paddingVertical: 4,

      borderRadius: 8,
      backgroundColor: colors.button,
    },
    searchInput: {
      fontSize: 18,
      color: colors.text,
      flexGrow: 1,
      fontFamily: 'SpaceGrotesk'
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
    emptySearch: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 24,
    },
  })
}
