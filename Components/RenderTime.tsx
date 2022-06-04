import { Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../constants/Colors";

export default function RenderTime({ time }: { time: number | undefined }) {
  const [num, setNum] = useState(time);

  useEffect(() => {
    setNum(time);
  });

  const calculateTime = () => {
    let seconds = Number(num);
    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor((seconds % (3600 * 24)) / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? (d > 9 ? `${d}` : "0" + `${d}`) : "00";
    let hDisplay = h > 0 ? (h > 9 ? `${h}` : "0" + `${h}`) : "00";
    let mDisplay = m > 0 ? (m > 9 ? `${m}` : "0" + `${m}`) : "00";
    let sDisplay = s > 0 ? (s > 9 ? `${s}` : "0" + `${s}`) : "00";
    return dDisplay + ":" + hDisplay + ":" + mDisplay + ":" + sDisplay;
  };

  return (
    <>
      <Text style={styles.timer}>{calculateTime()}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  timer: {
    textAlign: 'center',
    // marginLeft: 70,
    fontSize: 45,
    color: COLORS.secondary,
  }
})