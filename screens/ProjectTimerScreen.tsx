import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";
import { Project } from "../interface";
import HealthIcons from "../Components/HealthIcons";

const { height } = Dimensions.get("window");

const formatNumber = (number: number) => `0${number}`.slice(-2);

const getRemaining = (time: number) => {
  const mins = time >= 0 ? Math.floor(time / 60) : Math.floor(-time / 60);
  const secs = time >= 0 ? time - mins * 60 : -time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

export default function ProjectTimer({
  projectLevel,
  totalTimeShouldHaveWorked,
  setTotalTimeShouldHaveWorked,
  navigation,
  currentProject,
  userWorkTime,
  userShortPomTime,
  userLongPomTime,
  totalBreakTime,
  updateTimerStats,
  updateSessionCount,
}: {
  projectLevel: number
  totalTimeShouldHaveWorked: number;
  setTotalTimeShouldHaveWorked: any;
  projectHealth: number | undefined;
  setProjectHealth: any;
  navigation: any;
  currentProject?: Project | undefined;
  userWorkTime: any;
  userShortPomTime: any;
  userLongPomTime: any;
  totalWorkTime: number;
  totalNegWorkTime: number;
  totalBreakTime: number;
  totalOverBreakTime: number;
  updateTimerStats: any;
  numBreaks: number;
  numWorkSessions: number;
  updateSessionCount: any;
}) {
  const [remainingSecs, setRemainingSecs] = useState(userWorkTime * 60);
 
  const [isTraining, setIsTraining] = useState(false);
  const [onPom, setOnPom] = useState(false);
  const [pomType, setPomType] = useState("");
  const { mins, secs } = getRemaining(remainingSecs);
  const [image, setImage] = useState(require("../assets/Pets/PigeonPet.png"));
  const [isNegative, setIsNegative] = useState(false);

  useEffect(() => {
    reset()
  }, [currentProject])

  useEffect(() => {
    setRemainingSecs(userWorkTime * 60);
  }, [userWorkTime]);

  const toggle = () => {
    setIsTraining(!isTraining);
    updateSessionCount(1, 0);
  };

  const seeStats = () => {
    navigation.navigate("Stats", currentProject);
  };

  const reset = () => {
    setRemainingSecs(userWorkTime * 60);
    setIsTraining(false);
    setOnPom(false);
  };

  const handleButtonPress = () => {
    isTraining ? reset() : toggle();
    collectWorkTime();
    let timeWorked = totalTimeShouldHaveWorked + userWorkTime * 60
    isTraining && setTotalTimeShouldHaveWorked(timeWorked)
    setIsNegative(false);
  };

  const feedPet = () => {
    setRemainingSecs(userShortPomTime * 60);
    setOnPom(true);
    setPomType("short");
  };

  const walkPet = () => {
    setRemainingSecs(userLongPomTime * 60);
    setOnPom(true);
    setPomType("long");
  };

  useEffect(() => {
    if (remainingSecs === 0) {
      setIsNegative(true);
    }
    let interval: NodeJS.Timeout | undefined;
    if (isTraining) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs - 1);
      }, 1000);
    } else if (!isTraining && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTraining, remainingSecs]);

  const showMessage = () => {
    if (pomType === "short") {
      return "You fed your pet!";
    } else if (pomType === "long") {
      return "You walked your pet!";
    }
  };

  const collectWorkTime = () => {
    if (!isNegative && !onPom) {
      updateTimerStats((userWorkTime * 60 - remainingSecs), "workTime");
    } else if (isNegative && !onPom) {
      updateTimerStats(userWorkTime*60, "workTime")
      updateTimerStats(-remainingSecs, "negWorkTime");
    } else if (!isNegative && onPom) {
      if (pomType === "long") {
        updateTimerStats(userLongPomTime * 60 - remainingSecs, "breakTime");
      } else if (pomType === "short") {
        updateTimerStats(userShortPomTime * 60 - remainingSecs, "breakTime");
      }
    } else if (isNegative && onPom) {
      if (pomType === "long") {
        updateTimerStats(-remainingSecs, "overBreakTime");
        updateTimerStats(totalBreakTime + userLongPomTime * 60, "breakTime");
      } else if (pomType === "short") {
        updateTimerStats(-remainingSecs, "overBreakTime");
        updateTimerStats(totalBreakTime + userShortPomTime * 60, "breakTime");
      }
    }
  };

  return (
    <SafeAreaView style={onPom ? styles.background1 : styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.petStatusBar}>
          <Text style={styles.text}>Level {projectLevel}</Text>
          <HealthIcons health={currentProject?.petHealth} />
        </View>
        <Image
          style={styles.pet}
          source={
            currentProject?.petImage === "tomato-image"
              ? require("../assets/Pets/TomatoPet.png")
              : currentProject?.petImage === "pigeon-image"
              ? require("../assets/Pets/PigeonPet.png")
              : require("../assets/Pets/CandlePet.png")
          }
        />
        <Text
          style={isNegative ? styles.timerText1 : styles.timerText}
        >{`${mins} : ${secs}`}</Text>
        {!onPom && (
          <Button
            onPress={() => handleButtonPress()}
            text={isTraining ? "End Training" : "Start Training"}
            isTraining={isTraining}
          ></Button>
        )}
        {!isTraining && !onPom && (
          <Button onPress={seeStats} text="See Stats"></Button>
        )}
        {isTraining && !onPom && (
          <Button
            onPress={() => {
              feedPet();
              collectWorkTime();
              setIsNegative(false);
              updateSessionCount(0, 1);
            }}
            text="Feed Pet"
          ></Button>
        )}
        {isTraining && !onPom && (
          <Button
            onPress={() => {
              walkPet();
              collectWorkTime();
              setIsNegative(false);
              updateSessionCount(0, 1);
            }}
            text="Walk Pet"
          ></Button>
        )}
        {onPom && (
          <Button
            onPress={() => {
              reset();
              collectWorkTime();
              setIsNegative(false);
            }}
            text="End Break"
          ></Button>
        )}
        {onPom && (
          <View>
            <Text style={styles.pomText}>{showMessage()}</Text>
            <Text
              style={styles.pomText}
            >{`Great work, time to take a ${pomType} pom.`}</Text>
          </View>
        )}
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <View style={{ height: height * 0.09 }}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  petStatusBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: height * 0.02,
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
    color: COLORS.grey,
    fontFamily: "Nunito_800ExtraBold",
  },
  pet: {
    height: 250,
    width: 250,
    alignSelf: "center",
    marginBottom: height * 0.03,
  },
  timerText: {
    color: "black",
    fontSize: 75,
    marginBottom: 20,
    alignSelf: "center",
    fontFamily: "Nunito_900Black",
  },
  timerText1: {
    color: COLORS.primary,
    fontSize: 75,
    marginBottom: 20,
    alignSelf: "center",
    fontFamily: "Nunito_900Black",
  },
  background: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  background1: {
    flex: 1,
    backgroundColor: COLORS.accent2,
  },
  pomText: {
    textAlign: "center",
    alignSelf: "center",
    width: "80%",
    fontSize: 20,
    marginTop: 10,
    fontFamily: "Nunito_800ExtraBold",
  },
});
