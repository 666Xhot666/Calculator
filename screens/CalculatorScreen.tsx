import React, { useState } from 'react'
import { StyleSheet, View, Alert, ScrollView } from 'react-native'
import { CalculatorDisplay, CalculatorButton } from '../components'

export const CalculatorScreen = () => {
  const [display, setDisplay] = useState<string>('0')
  const [memory, setMemory] = useState<string>('0')
  const [expression, setExpression] = useState<string[]>([])
  const [nextDigit, setNext] = useState<boolean>(false)

  const pressDigit = (digit: string): void => {
    if (display === '0' && digit !== '.' || nextDigit) {
      setDisplay(digit)
      setExpression(prev => {
        if (prev.length === 1) {
          prev[0] = digit
        } else {
          prev.push(digit)
        }
        return prev
      })
      setNext(false)
    } else {
      setDisplay(prev => prev + digit)
      setExpression(prev => {
        prev[prev.length - 1] += digit
        return prev
      })
    }
  }

  const pressClear = (): void => {
    setDisplay('0')
    setExpression([])
  }

  const pressPlusMinus = (): void => {
    setDisplay(prev => (`${parseFloat(prev) * -1}`))
    setExpression(prev => {
      if (prev.length > 0) {
        prev[prev.length - 1] = `(${(parseFloat(prev[prev.length - 1].replace(/[()]/g, '')) * (-1))})`
      }
      return prev
    })
  }

  const pressPercent = (): void => {
    setDisplay(prev => `${+prev / 100}`)
    setExpression(prev => {
      if (prev.length > 0) {
        prev[prev.length - 1] = `${(+prev[prev.length - 1] / 100)}`
      }
      return prev
    })
  }

  const pressBinaryOperator = (operator: string): void => {
    operator = (operator == '×') ? '*' : (operator == '÷') ? '/' : operator
    setExpression(prev => {
      if (prev.length > 0) {
        if (!nextDigit) {
          prev.push(operator)
        } else {
          prev[prev.length-1] = operator
        }
        return prev
      } else {
        return prev = ["0", `${operator}`]
      }
    })
    setNext(true)
  }

  const pressEqual = (): void => {
    try {
      // if (nextDigit) {
      //   setExpression(prev => {
      //     prev.pop()
      //     return prev
      //   })
      // }

      const result = (nextDigit)?eval(expression.slice(0,expression.length-1).join('')):eval(expression.join(''))
      if (!result) {
        setDisplay('0')
        setExpression([])
      } else if (result == 'Infinity') {
        Alert.alert('You are can`t divide to 0')
        setDisplay('0')
        setExpression([])
      } else {
        setDisplay(`${result}`)
        setExpression([`${result}`])
      }
    } catch (error) {
      console.log(error)
      Alert.alert('You are can`t do it')
      setDisplay('0')
      setExpression([])
    }
  }


  const pressReadMemory = (): void => {
    setDisplay(memory)
    setExpression([`${memory}`])
  }
  const pressBinaryOperatorMemory = (operator: string): void => {
    setMemory(prev => `${eval(prev + operator.slice(-1) + `(${display})`)}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <ScrollView>
          <CalculatorDisplay display={display} />
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonRow}>
          <CalculatorButton onPress={pressClear} title="AC" backgroundColor="#bdbdbd" />
          <CalculatorButton onPress={pressPlusMinus} title="+/-" backgroundColor="#bdbdbd" />
          <CalculatorButton onPress={pressPercent} title="%" backgroundColor="#bdbdbd" />
          <CalculatorButton onPress={pressBinaryOperator} title="÷" backgroundColor="#ff9a19" />
        </View>
        <View style={styles.buttonRow}>
          <CalculatorButton onPress={() => setMemory('0')} title="mc" backgroundColor="#424242" />
          <CalculatorButton onPress={pressReadMemory} title="mr" backgroundColor="#424242" />
          <CalculatorButton onPress={pressBinaryOperatorMemory} title="m-" backgroundColor="#424242" />
          <CalculatorButton onPress={pressBinaryOperatorMemory} title="m+" backgroundColor="#ff9a19" />
        </View>
        <View style={styles.buttonRow}>
          <CalculatorButton onPress={pressDigit} title="7" backgroundColor="#424242" />
          <CalculatorButton onPress={pressDigit} title="8" backgroundColor="#424242" />
          <CalculatorButton onPress={pressDigit} title="9" backgroundColor="#424242" />
          <CalculatorButton onPress={pressBinaryOperator} title="×" backgroundColor="#ff9a19" />
        </View>
        <View style={styles.buttonRow}>
          <CalculatorButton onPress={pressDigit} title="4" backgroundColor="#424242" />
          <CalculatorButton onPress={pressDigit} title="5" backgroundColor="#424242" />
          <CalculatorButton onPress={pressDigit} title="6" backgroundColor="#424242" />
          <CalculatorButton onPress={pressBinaryOperator} title="-" backgroundColor="#ff9a19" />
        </View>
        <View style={styles.buttonRow}>
          <CalculatorButton onPress={pressDigit} title="1" backgroundColor="#424242" />
          <CalculatorButton onPress={pressDigit} title="2" backgroundColor="#424242" />
          <CalculatorButton onPress={pressDigit} title="3" backgroundColor="#424242" />
          <CalculatorButton onPress={pressBinaryOperator} title="+" backgroundColor="#ff9a19" />
        </View>
        <View style={styles.buttonRow}>
          <CalculatorButton onPress={pressDigit} title="0" backgroundColor="#424242" style={{ flex: 2 }} />
          <CalculatorButton onPress={pressDigit} title="." backgroundColor="#424242" style={{ flex: 1 }} />
          <CalculatorButton onPress={pressEqual} title="=" backgroundColor="#ff9a19" style={{ flex: 1 }} />
        </View>
      </View>
    </View>

  )
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
