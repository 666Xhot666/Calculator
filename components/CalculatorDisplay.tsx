import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

interface DisplayText {
  display: string
}

export const CalculatorDisplay: React.FC<DisplayText> = ({ display }) => (<View style={styles.container}>
  <Text style={styles.text}>{display}</Text>
</View>)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20
  },
  text: {
    color: '#fff',
    fontSize: 60
  }
})
