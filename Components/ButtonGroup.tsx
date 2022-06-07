import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/Colors";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";

export default function Button({
  text1,
  text2,
  text3,
  onPress,
  currentlyActive,
}: {
  text1: string;
  text2: string;
  text3: string;
  onPress: any;
  currentlyActive: any;
}) {
  let [fontsLoaded] = useFonts({
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const makeOneActive = () => {
    onPress(text1);
  };

  const makeTwoActive = () => {
    onPress(text2);
  };

  const makeThreeActive = () => {
    onPress(text3);
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={makeOneActive}
        style={{
          ...styles.button,
          backgroundColor:
            currentlyActive === text1 ? COLORS.secondary : "transparent",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: currentlyActive === text1 ? COLORS.white : COLORS.secondary,
          }}
        >
          {text1}
        </Text>
      </Pressable>
      <Pressable
        onPress={makeTwoActive}
        style={{
          ...styles.button,
          backgroundColor:
            currentlyActive === text2 ? COLORS.secondary : "transparent",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: currentlyActive === text2 ? COLORS.white : COLORS.secondary,
          }}
        >
          {text2}
        </Text>
      </Pressable>
      <Pressable
        onPress={makeThreeActive}
        style={{
          ...styles.button,
          backgroundColor:
            currentlyActive === text3 ? COLORS.secondary : "transparent",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: currentlyActive === text3 ? COLORS.white : COLORS.secondary,
          }}
        >
          {text3}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "35%",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.accent2,
    marginBottom: 15,
  },
  text: {
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
