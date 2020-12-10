import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CalculatorScreen} from './screens/CalcuratorScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <CalculatorScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
