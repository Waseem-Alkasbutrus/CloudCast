import { Pressable, StyleSheet, View } from 'react-native'
import Font from './Font'
import { Colors } from './GlobalVars'

export default function ChipField({
  Options,
  setActiveIndex,
  ActiveIndex = 0,
}) {
  let styles = getStyles(Colors._z)

  let chips = Options.map((option, index) => {
    return (
      <Pressable
        key={index}
        onPress={() => setActiveIndex(index)}
        style={
          ActiveIndex === index ? [styles.chip, styles.activeChip] : styles.chip
        }
      >
        <Font
          style={
            ActiveIndex === index
              ? [styles.label, styles.activeLabel]
              : styles.label
          }
        >
          {option}
        </Font>
      </Pressable>
    )
  })

  return <View style={styles.fieldWrapper}>{chips}</View>
}

function getStyles(colors) {
  return StyleSheet.create({
    fieldWrapper: { flexDirection: 'row', marginBottom: 8 },
    chip: {
      borderColor: colors.text,
      borderWidth: 1,
      borderRadius: 64,
      paddingVertical: 2,
      paddingHorizontal: 16,
      marginHorizontal: 4,
      flexGrow: 1,
    },
    label: {
      fontSize: 16,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    activeChip: {
      backgroundColor: colors.text,
    },
    activeLabel: {
      color: colors.gradient[1],
    },
  })
}
