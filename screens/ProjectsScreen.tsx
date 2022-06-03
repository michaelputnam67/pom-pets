import {
  Text,
  FlatList,
  Pressable,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProjectPet from "../Components/ProjectPet";
import { COLORS } from "../constants/Colors";
import { Projects, Project } from "../interface";

export default function ProjectsScreen({
  navigation,
  projects,
}: {
  navigation?: any;
  projects: Projects;
}) {
  console.log("Projects Screen: ", navigation);
  const [pets, setPets] = useState<Projects | null>(projects);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );

  const updateCurrentProject = (item: any) => {
    console.log("navigation: ", navigation);
    if (!pets) {
      return;
    }
    const project: any = pets.find((pet) => {
      return item.id === pet.id;
    });
    setCurrentProject(project);
    navigation.navigate("Pet", currentProject);
  };

  const renderPet = ({
    item,
  }: {
    item: { projectName: string; petImage: string; id: number };
  }) => (
    <ProjectPet
      item={item}
      key={item.id}
      name={item.projectName}
      source={item.petImage}
      updateCurrentProject={updateCurrentProject}
    />
  );

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.header}>Your Pets</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pets}
        renderItem={renderPet}
        ListFooterComponent={() => (
          <Pressable style={styles.view} onPress={() => console.log("CLICK")}>
            <Image
              style={{ ...styles.main }}
              source={require("../assets/Icons-Buttons/AddProjectBtn.png")}
            />
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

// [
//   { key: 1, image: require("../assets/Pets/PigeonPet.png"), name: "Pigeon" },
//   { key: 2, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
//   { key: 3, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
//   { key: 4, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
//   { key: 5, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
//   { key: 6, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
// ]
