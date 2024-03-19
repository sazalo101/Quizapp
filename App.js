import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const questions = [
  {
    question: "What's the capital of France?",
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  },
  // Add more questions as needed
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10); // 10 seconds for each question

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          // Move to next question or end quiz
          return 10; // Reset timer for next question
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestionIndex].answer) {
      // Correct answer logic
      alert('Correct!');
    } else {
      // Incorrect answer logic
      alert('Incorrect!');
    }
    // Move to next question or end quiz
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timer} s</Text>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timer: {
    fontSize: 20,
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
