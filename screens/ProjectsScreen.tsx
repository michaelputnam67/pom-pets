import {
  Text,
  FlatList,
  Pressable,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import ProjectPet from "../Components/ProjectPet";
import { COLORS } from "../constants/Colors";

export default function ProjectsScreen() {
  const [pets, setPets] = useState([
    { key: 1, image: require("../assets/Pets/PigeonPet.png"), name: "Pidgeon" },
    { key: 2, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 3, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 4, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 5, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 6, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
  ]);

  // Add Fetch above ___________________________________

  const renderPet = ({ item }: { item: { name: string; image: string } }) => (
    <ProjectPet name={item.name} source={item.image} />
  );

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.header}>Your Pets</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pets}
        renderItem={renderPet}
        ListFooterComponent={() => (
          <Pressable style={styles.view}>
            <Image
              style={{ ...styles.main }}
              source={require("../assets/Icons-Buttons/AddProjectBtn.png")}
            ></Image>
          </Pressable>
        )}
      />
      <View style={{ height: "12%" }}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 200,
    width: 200,
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    marginTop: 25,
  },
  view: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: COLORS.primary,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
