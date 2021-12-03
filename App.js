import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";
import "./firebase.js";

export default function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const cupChoices = ["cup1", "cup2", "cup3"];

  const db = getDatabase();
  const reference = ref(db, "highScore/");

  useEffect(() => {
    onValue(reference, (snapshot) => {
      if (snapshot.val() !== null) setHighScore(snapshot.val().highScore);
    });
  }, []);

  const storeHighScore = (score) => {
    set(reference, { highScore: score });
  };

  const playRound = (userChoice) => {
    const correctChoice = Math.floor(Math.random() * 3);
    console.log("Your Choice ===> ", userChoice);
    console.log("Correct Choice ===> ", cupChoices[correctChoice]);

    if (userChoice === cupChoices[correctChoice]) {
      {
        setCurrentScore(currentScore + 1);
        if (currentScore >= highScore) {
          setHighScore(currentScore + 1);
          storeHighScore(currentScore + 1);
        }
      }
      return;
    } else {
      setCurrentScore(0);
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
            <Image
              style={styles.cupImage}
              source={require("./assets/redcup.png")}
            ></Image>
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

  scoreBoard: {
    paddingTop: 10,
    fontSize: 27,
    width: 160,
    color: "black",
    height: 90,
    textAlign: "center",
    borderWidth: 4,
    borderColor: "black",
    borderStyle: "dashed",
    borderRadius: 5,
  },
  cupChoice: {
    fontSize: 20,
    color: "white",
    paddingTop: 30,
    paddingLeft: 20,
  },
  cupImage: {
    margin: 20,
    height: 180,
    width: 150,
    //backgroundColor: "red",
    //borderRadius: 40,
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
