import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ButtonProp {
  onPress(digit:string): void,
  title: string,
  backgroundColor: string,
  style?:{}
}

export const CalculatorButton: React.FC<ButtonProp> = (props) => {
  return (
    <TouchableOpacity onPress={()=>props.onPress(props.title)} style={[styles.container, { backgroundColor: props.backgroundColor }, {...props.style}]}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 40,
    margin: 3
  },
  text: {
    fontSize: 28,
    color:"#fff",
    fontWeight: "bold"
  }
})
