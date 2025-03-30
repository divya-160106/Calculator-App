import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const onButtonPress = (item) => {
    if (item === "AC") {
      setInput("");
      setResult("");
    } else if (item === "C") {
      setInput(input.slice(0, -1));
    } else if (item === "=") {
      try {
        setResult(eval(input).toString()); // Evaluates the expression
      } catch (error) {
        setResult("Error");
      }
    } else {
      setInput(input + item);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Display Input and Result */}
      <View style={styles.displayContainer}>
        <Text style={styles.inputText}>{input || "0"}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {[
          ["AC", "C", ".", "/"],
          ["9", "8", "7", "*"],
          ["6", "5", "4", "-"],
          ["1", "2", "3", "+"],
          ["0", "(", ")", "="]
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.button, item === "=" ? styles.equalButton : null]} 
                onPress={() => onButtonPress(item)}>
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  displayContainer: {
    width: '90%',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 40,
    color: '#000',
  },
  resultText: {
    fontSize: 30,
    color: '#888',
  },
  buttonContainer: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: '22%',
    height: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  equalButton: {
    height: 130, // Makes the '=' button span two rows
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});