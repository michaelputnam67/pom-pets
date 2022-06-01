import React from "react";
import { Text, Image, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

export default function ProjectPet({
  source,
  name,
}: {
  source: any;
  name: string;
}) {
  return (
    <Pressable style={styles.main}>
      <Pressable style={styles.deleteButtonContainer}>
        <Image
          style={styles.deleteButton}
          source={require("../assets/Icons-Buttons/DeleteBtn.png")}
        />
      </Pressable>
      <Image style={styles.image} source={source} />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deleteButtonContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  main: {
    height: 200,
    width: 200,
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    marginTop: 25,
  },
  deleteButton: {
    height: 30,
    width: 30,
  },
  image: {
    marginTop: -10,
    height: 150,
    width: 150,
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    color: COLORS.primary,
    alignSelf: "center",
  },
});