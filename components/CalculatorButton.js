import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

export const CalculatorButton = ({properties}) => {
  if(!properties.style) properties.style={}
  return (<TouchableOpacity onPress={properties.onPress} style={[
      styles.container, {
        backgroundColor: properties.backgroundColor
      },
      {... properties.style}
    ]}>
    <Text style={[
        styles.text, {
          color: properties.color
          }
      ]}>
      {properties.title}
    </Text>
  </TouchableOpacity>)
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 40,
    margin:3
  },
  text: {
    fontSize: 28,
    fontWeight: "bold"
  }
})
