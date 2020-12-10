import React, {useState} from 'react'
import {StyleSheet, View, Text, Alert} from 'react-native'
import {CalculatorButton, CalculatorDisplay} from '../components'

const addDigit = () => {}

export const CalculatorScreen = (props) => {
  const [displayText, setText] = useState('0')
  const [memory, setMemory] = useState('0')
  const [expression, setExpression] = useState([])
  const [nextDigit, setNext] = useState(false)

  //when digit is pressed ...
  const pressDigit = (digit) => {
    if (displayText.toString() === '0' && digit !== '.' || nextDigit) {
      setText(digit)
      setExpression(prev => {
        prev.push(digit)
        return prev
      })
      setNext(false)
    } else {
      setText(prev => prev + digit)
      setExpression(prev => {
        prev[expression.length - 1] += digit
        return prev
      })
    }
  }

  // when +/- is pressed ...
  const pressPlusMinus = () => {
    setText(prev => {
      return (parseFloat(prev) * (-1)).toString()
    })
    setExpression(prev => {
      if (prev.length > 0) {
        prev[prev.length - 1] = `(${ (parseFloat(prev[prev.length - 1].replace(/[()]/g, '')) * (-1))})`
      }
      return prev
    })
  }
  // when AC is pressed ...
  const pressClear = () => {
    setText('0')
    setExpression([])
  }
  // when = is pressed ...
  const pressEqual = () => {
    try {
      const result = eval(expression.join(''))
      if (!result) {
        setText('0')
        setExpression([])
      } else if (result == 'Infinity') {
        Alert.alert('You are can`t divide to 0')
        setText('0')
        setExpression([])
      } else {
        setText(`${result}`)
        setExpression([`${result}`])
      }
    } catch (e) {
      Alert.alert('You are can`t do it')
      setText('0')
      setExpression([])
    }
  }

  // when % is pressed ...
  const pressPercent = () => {
    setText(prev => prev / 100)
    setExpression(prev => {
      if (prev.length > 0) {
        prev[prev.length - 1] = `${ (parseFloat(prev[prev.length - 1]) / 100)}`
      }
      return prev
    })
  }
  // when +or-or*or/ is pressed ...
  const pressBinaryOperator = (operator) => {
    setExpression(prev => {
      if (prev.length > 0) {
        if (prev[prev.length - 1] !== operator) {
          prev.push(operator)
        }
        return prev
      } else {
        return prev = ["0", `${operator}`]
      }
    })
    setNext(true)
  }

  const pressMemory = (butt) => {

  }

  return (<View style={styles.container}>
    <View style={styles.display}>
      <CalculatorDisplay displayText={displayText}/>
    </View>
    <View style={styles.buttons}>
      <View style={styles.buttonRow}>
        <CalculatorButton properties={{
            onPress: () => pressClear(),
            title: "AC",
            color: '#fff',
            backgroundColor: '#bdbdbd'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressPlusMinus(),
            title: "+/-",
            color: '#fff',
            backgroundColor: '#bdbdbd'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressPercent(),
            title: "%",
            color: '#fff',
            backgroundColor: '#bdbdbd'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressBinaryOperator('/'),
            title: '/',
            color: '#fff',
            backgroundColor: '#ff9a19'
          }}/>
      </View>
      <View style={styles.buttonRow}>
        <CalculatorButton properties={{
            onPress: () => setMemory('0'),
            title: "mc",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => setText(memory),
            title: 'mr',
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => setMemory(prev => eval(prev+"-"+`(${displayText})`)),
            title: "m-",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => setMemory(prev => eval(prev+"+"+`(${displayText})`)),
            title: "m+",
            color: '#fff',
            backgroundColor: '#ff9a19'
          }}/>
      </View>
      <View style={styles.buttonRow}>
        <CalculatorButton properties={{
            onPress: () => pressDigit("7"),
            title: "7",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressDigit("8"),
            title: '8',
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressDigit("9"),
            title: "9",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressBinaryOperator("*"),
            title: "*",
            color: '#fff',
            backgroundColor: '#ff9a19'
          }}/>
      </View>
      <View style={styles.buttonRow}>
        <CalculatorButton properties={{
            onPress: () => pressDigit("4"),
            title: "4",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressDigit("5"),
            title: '5',
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressDigit("6"),
            title: "6",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressBinaryOperator('-'),
            title: "-",
            color: '#fff',
            backgroundColor: '#ff9a19'
          }}/>
      </View>
      <View style={styles.buttonRow}>
        <CalculatorButton properties={{
            onPress: () => pressDigit("1"),
            title: "1",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressDigit("2"),
            title: '2',
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressDigit("3"),
            title: "3",
            color: '#fff',
            backgroundColor: '#424242'
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressBinaryOperator('+'),
            title: "+",
            color: '#fff',
            backgroundColor: '#ff9a19'
          }}/>
      </View>
      <View style={styles.buttonRow}>
        <CalculatorButton properties={{
            onPress: () => pressDigit("0"),
            title: "0",
            color: '#fff',
            backgroundColor: '#424242',
            style: {
              flex: 2,
              marginRight: 22
            }
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressDigit("."),
            title: ',',
            color: '#fff',
            backgroundColor: '#424242',
            style: {
              flex: 1,
              marginRight: 22
            }
          }}/>
        <CalculatorButton properties={{
            onPress: () => pressEqual(),
            title: "=",
            color: '#fff',
            backgroundColor: '#ff9a19',
            style: {
              flex: 1
            }
          }}/>
      </View>
    </View>
  </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  display: {
    flex: 1
  },
  buttons: {},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})
