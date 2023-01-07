import { View, Image, StyleSheet } from 'react-native'
import Font from './Font'
import IconStat from './IconStat'

export default function FeaturedCity() {
  return (
    <View style={styles.featuredCity}>
      <Image
        style={styles.image}
        source={require('../../assets/images/NewYorkCity.png')}
        blurRadius={3}
      ></Image>
      <View>
        <Font style={styles.city}>New York City</Font>
        <IconStat
          Icon={require('../../assets/icons/Clear-Sky.png')}
          Stat={'Clear Sky'}
          Size={18}
        ></IconStat>
      </View>
      <View>
        <IconStat
          Icon={require('../../assets/icons/Thermometer.png')}
          Stat={99}
          Unit={'f'}
          Size={24}
        ></IconStat>
        <IconStat
          Icon={require('../../assets/icons/Rain-Shower.png')}
          Stat={10}
          Unit={'%'}
          Size={24}
        ></IconStat>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  featuredCity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    height: 180,
    overflow: 'hidden',
    borderRadius: 8,
    marginVertical: 4,
  },
  image: {
    opacity: 0.95,
    position: 'absolute',
    top: -24,
    left: -24,
  },
  city : {
    fontSize: 28,
  }
})
