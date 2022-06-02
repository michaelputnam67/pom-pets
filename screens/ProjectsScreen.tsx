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


export default function ProjectsScreen( { navigation } : { navigation: any } ) {
  const [pets, setPets] = useState([
    { key: 1, image: require("../assets/Pets/PigeonPet.png"), name: "Pigeon" },
    { key: 2, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 3, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 4, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 5, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
    { key: 6, image: require("../assets/Pets/TomatoPet.png"), name: "Tomato" },
  ]);
  const [currentProject, setCurrentProject] = useState(pets[0])

  // Add Fetch above ___________________________________

  const updateCurrentProject = (item : any) => {
    const project = 
      pets.filter(pet => {
        return (item.key === pet.key)
    })
    setCurrentProject(project[0])
    navigation.navigate('Pet', currentProject);
  }

  const renderPet = ({ item }: { item: { name: string; image: string; key: number} }) => (
    <ProjectPet item={item} key={item.key} name={item.name} source={item.image} updateCurrentProject={updateCurrentProject}/>
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
