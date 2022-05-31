import {StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import React, { useEffect, useState} from "react";
import { SafeAreaView } from "react-native";

const screen = Dimensions.get('window')

const formatNumber = (number : number) => `0${number}`.slice(-2);

const getRemaining = (time : number) => {
  const mins = Math.floor(time / 60)
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function ProjectTimer() {
  const [remainingSecs, setRemainingSecs] = useState(600);
  const [isActive, setIsActive] = useState(false);
  const {mins, secs} = getRemaining(remainingSecs)

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () => {
    setRemainingSecs(600);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs - 1);
      }, 1000)
    } else if(!isActive && remainingSecs !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs])

  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.timerText}>{`${mins} : ${secs}`}</Text>
    <Pressable onPress= {toggle} style={styles.button}>
      <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
    </Pressable>
    <Pressable onPress= {reset} style={styles.button}>
      <Text style={styles.buttonText}>Reset</Text>
    </Pressable>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 10,
    borderColor: "black",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 45,
    color: "black"
  },
  timerText: {
    color: 'black',
    fontSize: 90,
    marginBottom: 20,
  }
})