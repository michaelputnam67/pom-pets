import React from "react";
import { Text, Image, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";
import { useFonts, Nunito_500Medium } from "@expo-google-fonts/nunito";

export default function ProjectPet({
  navigation,
  name,
  updateCurrentProject,
  item,
}: {
  navigation: any;
  name: string;
  updateCurrentProject: any;
  item: any;
}) {
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Pressable
      style={styles.main}
      onPress={() => {
        updateCurrentProject(item);
        navigation.navigate("Pet");
      }}
    >
      <Pressable style={styles.deleteButtonContainer}>
        <Image
          style={styles.deleteButton}
          source={require("../assets/Icons-Buttons/DeleteBtn.png")}
        />
      </Pressable>
      <Image
        style={styles.image}
        source={
          item.petImage === "tomato-image"
            ? require("../assets/Pets/TomatoPet.png")
            : require("../assets/Pets/PigeonPet.png")
        }
      />
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
    color: COLORS.primary,
    alignSelf: "center",
    fontFamily: "Nunito_500Medium",
    fontSize: 18,
  },
});
