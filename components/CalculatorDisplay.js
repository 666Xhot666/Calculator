import React from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'

export const CalculatorDisplay = ({displayText}) => {

  return (<View style={styles.container}>
    <Text style={styles.text}>{displayText}</Text>
  </View>)
}

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
