import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";
import LottieView from "lottie-react-native";

export default function AppLoader() {
  return (
    <View style={styles.modal}>
      <LottieView
        source={require("../assets/animations/circleloader.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.accent,
  },
});
