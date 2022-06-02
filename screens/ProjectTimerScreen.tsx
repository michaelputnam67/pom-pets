import { Text, View, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";

const formatNumber = (number : number) => `0${number}`.slice(-2);

const getRemaining = (time : number) => {
  const mins = time >= 0 ? Math.floor(time / 60) : Math.floor(-time / 60)
  const secs = time >= 0 ? time - mins * 60 : -time + mins * 60
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function ProjectTimer() {
  const [pet, setPet] = useState({
    name: "Pigeon",
    image: require("../assets/Pets/PigeonPet.png"),
  });

  const [remainingSecs, setRemainingSecs] = useState(1500);
  const [negativeTime, setNegativeTime] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [onPom, setOnPom] = useState(false);
  const [pomType, setPomType] = useState('')
  const {mins, secs} = getRemaining(remainingSecs)

  const toggle = () => {
    setIsTraining(!isTraining);
  }

  const reset = () => {
    setRemainingSecs(1500);
    setIsTraining(false);
    setOnPom(false)
  }

  const feedPet = () => {
    setRemainingSecs(300)
    setOnPom(true)
    setPomType('short')
  }

  const walkPet = () => {
    setRemainingSecs(900)
    setOnPom(true)
    setPomType('long')
  }
  
  useEffect(() => {
    let interval : NodeJS.Timeout | undefined;
    if(isTraining) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs - 1);
      }, 1000)
    } else if(!isTraining && remainingSecs !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [isTraining, remainingSecs])
  
  const showMessage = () => {
    if(pomType === 'short') {
      return "You Fed your Pet!"
    } else if(pomType === 'long') {
      return "You walked your Pet!"
    }
  }

  return (
    <SafeAreaView style={onPom ? styles.background1: styles.background}>
      <View style={styles.petStatusBar}>
        <Text style={styles.text}>Lvl 1</Text>
        <View style={styles.healthContainer}>
          <Image
            style={styles.healthIcon}
            source={require("../assets/Icons-Buttons/HeartIcon-Grey-Empty.png")}
          />
          <Image
            style={styles.healthIcon}
            source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
          />
          <Image
            style={styles.healthIcon}
            source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
          />
        </View>
      </View>
      <Image
        style={styles.pet}
        source={require("../assets/Pets/PigeonPet.png")}
      />
      <Text style={styles.timerText}>{`${mins} : ${secs}`}</Text>
      {!onPom && <Button onPress={isTraining ? reset : toggle} text={isTraining ? "End Training" : "Start Training"} isTraining={isTraining}></Button>}
      {!isTraining && !onPom && <Button onPress={() => console.log("SEE STATS SCREEN")} text="See Stats"></Button>}
      {isTraining && !onPom && <Button onPress={feedPet} text="Feed Pet"></Button>}
      {isTraining && !onPom && <Button onPress={walkPet} text="Take a Walk"></Button>}
      {onPom && <Button onPress={reset} text="End Break"></Button>}
      {onPom && <View>
        <Text style={styles.pomText}>{showMessage()}</Text>
        <Text style={styles.pomText}>{`Great work, time to take a ${pomType} break`}</Text>
      </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  healthIcon: {
    height: 35,
    width: 35,
    tintColor: COLORS.grey,
  },
  healthContainer: {
    display: "flex",
    flexDirection: "row",
  },
  petStatusBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 25,
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
    color: COLORS.grey,
  },
  pet: {
    height: 280,
    width: 280,
    alignSelf: "center",
    marginBottom: 30
  },
  petContainer: {},
  timerText: {
    fontFamily: "MPLUSRounded1c-Black",
    color: COLORS.primary,
    fontSize: 75,
    marginBottom: 20,
    alignSelf: "center"
  },
  background: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  background1: {
    flex: 1,
    backgroundColor: COLORS.accent2
  },
  pomText: {
    textAlign: 'center',
    alignSelf: 'center',
    width: '80%',
    fontSize: 30,
    marginTop: 10,
  }
});
