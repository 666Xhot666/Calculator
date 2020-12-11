import React from 'react';
import { StyleSheet, View } from 'react-native';
import {CalculatorScreen} from './screens/CalculatorScreen'

 const App:React.FC = () => {
  return (
    <View style={styles.container}>
    <CalculatorScreen />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App
