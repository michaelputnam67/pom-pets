import { View, SafeAreaView, StyleSheet, Text, Image, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";
import { Project } from "../interface";
import Button from "../Components/Button";
import HealthIcons from "../Components/HealthIcons";
import RenderTime from "../Components/RenderTime";
import * as Linking from "expo-linking";

export default function ProjectStatisticsScreen({
  currentProject,
  navigation,
}: {
  navigation: any;
  currentProject: Project | undefined;
}) {
  const toTraining = () => {
    navigation.navigate("Pet");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Project Stats</Text>
      <Image
        style={styles.pet}
        source={
          currentProject?.petImage === "tomato-image"
            ? require("../assets/Pets/TomatoPet.png")
            : require("../assets/Pets/PigeonPet.png")
        }
      />
      <Text style={styles.projectName}>Project: {currentProject?.projectName}</Text>
      <Button text="Back to training" onPress={toTraining}></Button>
      <ScrollView style={styles.statsContainer}>
        <View>
          <Text style={styles.label}>Level {currentProject?.petLevel}</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.label}>Health</Text>
          <View style={styles.health}>
            <HealthIcons health={currentProject?.petHealth} />
          </View>
        </View>
        <View>
          <RenderTime time={currentProject?.stats.totalWorkTime} />
          <Text style={styles.label}>Total Training Time</Text>
        </View>
        <View>
          <RenderTime time={currentProject?.stats.totalLongPomTime} />
          <Text style={styles.label}>Total Long Pom Time</Text>
        </View>
        <View>
          <RenderTime time={currentProject?.stats.totalShortPomTime} />
          <Text style={styles.label}>Total Short Pom Time</Text>
        </View>
        <View>
          <Text style={styles.number}>{currentProject?.stats.totalWorkSessions}</Text>
          <Text style={styles.label}>Number of Work Sessions</Text>
        </View>
        <View>
          <Text style={styles.number}>{currentProject?.stats.totalShortSessions}</Text>
          <Text style={styles.label}>Number of Short Breaks</Text>
        </View>
        <View style={{marginBottom: 50}}>
          <Text style={{...styles.label, color: "blue"}}  onPress={() => Linking.openURL(`${currentProject?.projectGitHub}`)}>Git Hub Project Link</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    alignSelf: "center",
    fontSize: 40,
    color: COLORS.primary,
  },
  pet: {
    height: 280,
    width: 280,
    alignSelf: "center",
    marginBottom: 10,
  },
  projectName: {
    textAlign: 'center',
    fontSize: 25,
    color: COLORS.grey
  },
  statsContainer: {
    height: 300,
    marginBottom: 30,
    marginTop: 20,
  },
  levelContainer: {
    justifyContent: 'center', 
    flexDirection: "row",
  },
  label: {
    // marginLeft: 35,
    textAlign: 'center',
    fontSize: 25,
    color: COLORS.grey,
    marginBottom: 20,
  }, 
  health: {
    marginLeft: 50,
  },
  number: {
    textAlign: 'center',
    fontSize: 40,
    color: COLORS.primary,
  }
});
