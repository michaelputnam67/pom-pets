import { Text, View, Button } from "react-native";
import React, { useEffect, useState} from "react";
import { SafeAreaView } from "react-native";
import BackgroundTimer from 'react-native-background-timer';

export default function ProjectTimer() {
  const [secondsLeft, setSecondsLeft] = useState(3601);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    if(timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  useEffect (() => {
    if (secondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft])

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(seconds => {
        if(seconds > 0) return seconds - 1;
        else return 0;
      });
    }, 1000)
  }
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor(secondsLeft / 60 % 60)
    let seconds = Math.floor(secondsLeft % 60)

    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return {
      displayHours,
      displayMins,
      displaySeconds
    }
  }
  return (
  <SafeAreaView>
    <Text>{clockify().displayHours} Hours {clockify().displayMins} Mins {' '} {clockify().displaySeconds} Secs 
    </Text>
    <Button title="Start/Stop"></Button>
  </SafeAreaView>
  )
}
