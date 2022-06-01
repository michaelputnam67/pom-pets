import { Text, View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";

export default function ProjectTimer() {
  const [pet, setPet] = useState({
    name: "Pigeon",
    image: require("../assets/Pets/PigeonPet.png"),
  });
  const [count, setCount] = useState(0);

  const onPress = () => {
    setCount(count + 1);
  };

  return (
    <SafeAreaView>
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
      <View>
        <Image
          style={styles.pet}
          source={require("../assets/Pets/PigeonPet.png")}
        />
      </View>
      <Button onPress={() => onPress()} text="Start Training"></Button>
      <Button onPress={() => onPress()} text="See Stats"></Button>
      <Text>{count}</Text>
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
    height: "60%",
    width: "60%",
  },
  petContainer: {},
});
