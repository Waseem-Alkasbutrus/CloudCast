import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import FeaturedCity from '../components/FeaturedCity'
import ScreenWrapper from '../components/ScreenWrapper'
import TitledSection from '../components/TitledSection.jsx'

import { API_KEY } from '@env'
import Font from '../components/Font'
import { CitySearchListItem } from '../components/CityListItem'

async function searchFor(city, setResults) {
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
                key={city.lat * city.long}
                City={city}
              ></CitySearchListItem>
            )
          })
        } else {
          results = [
            <Font style={styles.emptySearch}>no matching cities...</Font>,
          ]
        }

        setResults(results)
      } catch (err) {
        console.log(err.message)
      }
    })
}

function renderResults(results) {
  let res
  if (results.length > 0) {
    res = <Font>{results[0].name + ' (' + results[0].state + ')'}</Font>
  } else {
    res = <Font>No cities found</Font>
  }
  ;<TitledSection Label={'Search Results'}>{res}</TitledSection>
}

export default function SearchScreen() {
  const [searchCity, setSearchCity] = useState()
  const [searchResults, setSearchResults] = useState([])

  return (
    <ScreenWrapper>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a city..."
          placeholderTextColor={'#FBFBFB95'}
          returnKeyType="search"
          onChangeText={(newText) => setSearchCity(newText)}
          onSubmitEditing={() => {
            searchFor(searchCity, setSearchResults)
          }}
        ></TextInput>

        <Pressable
          style={styles.searchButton}
          onPress={() => console.log(searchCity)}
        >
          <Image
            style={styles.searchIcon}
            source={require('../../assets/icons/Search.png')}
          ></Image>
        </Pressable>
      </View>

      <TitledSection Label="Search Results">{searchResults}</TitledSection>
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
    fontSize: 18,

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
  emptySearch: {
    fontSize: 20,
    color: '#FBFBFB',
    textAlign: 'center',
    marginTop: 24,
  },
})
