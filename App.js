import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";

export default function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const cupChoices = ["cup1", "cup2", "cup3"];

  const storeHighScore = (score) => {};

  const playRound = (userChoice) => {
    const computerChoice = Math.floor(Math.random() * 3);
    console.log("user ===> ", userChoice);
    console.log("computer ===> ", cupChoices[computerChoice]);
    // setOutCome({ user: userChoice, computer: cupChoices[computerChoice] });

    if (userChoice === cupChoices[computerChoice]) {
      {
        setCurrentScore(currentScore + 1);
        if (currentScore >= highScore) {
          setHighScore(currentScore + 1);
          storeHighScore(currentScore + 1);
        } else {
          setCurrentScore(0);
        }
      }
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreBoard}>Highest Score: {highScore}</Text>
      <View style={styles.cupContainer}>
        {cupChoices.map((cupChoice, index) => (
          <Pressable
            key={index}
            style={styles.cup}
            onPress={() => playRound(cupChoice)}
          >
            <Text style={styles.cupChoice}>{cupChoice} </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.scoreBoard}>Current Score: {currentScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  cup: {
    margin: 25,
    height: 100,
    width: 80,
    backgroundColor: "red",
    borderRadius: 40,
  },
  scoreBoard: {
    fontSize: 27,
    width: 160,
    backgroundColor: "black",
    color: "white",
    height: 90,
    textAlign: "center",
    borderRadius: 50,
  },
  cupChoice: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

/**
 * {gameChoices.map((gameChoice, index) => (
          <Pressable
            key={index}
            style={homeStyles.gameChoiceButton}
            onPress={() => playRound(gameChoice)}
          >
            <Text style={homeStyles.buttonText}>{gameChoice}</Text>
          </Pressable>
        ))}
 */
