import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";
import { Project } from "../interface";
import Button from "../Components/Button";
import HealthIcons from "../Components/HealthIcons";
import RenderTime from "../Components/RenderTime";
import * as Linking from "expo-linking";

export default function ProjectStatisticsScreen({
  projectLevel,
  currentProject,
  navigation,
  totalWorkTime,
  totalBreakTime,
  numBreaks,
  numWorkSessions,
}: {
  projectLevel: number;
  navigation: any;
  currentProject: Project | undefined;
  totalWorkTime: number;
  totalBreakTime: number;
  numBreaks: number;
  numWorkSessions: number;
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
            : currentProject?.petImage === "pigeon-image"
            ? require("../assets/Pets/PigeonPet.png")
            : require("../assets/Pets/CandlePet.png")
        }
      />
      <Text style={styles.projectName}>
        Project: {currentProject?.projectName}
      </Text>
      <Button text="Back to Training" onPress={toTraining}></Button>
      <ScrollView
        style={styles.statsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statContainer}>
          <Text style={styles.level}>Level {projectLevel}</Text>
        </View>
        <View style={styles.healthContainer}>
          <Text style={styles.label}>Health</Text>
          <View style={styles.health}>
            <HealthIcons health={currentProject?.petHealth} />
          </View>
        </View>
        <View style={styles.statContainer}>
          <RenderTime
            time={Number(currentProject?.stats.totalWorkTime) + totalWorkTime}
          />
          <Text style={styles.label}>Total Training Time</Text>
        </View>
        <View style={styles.statContainer}>
          <RenderTime
            time={
              Number(currentProject?.stats.totalLongPomTime) + totalBreakTime
            }
          />
          <Text style={styles.label}>Total Pom Time</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.number}>
            {Number(currentProject?.stats.totalWorkSessions) + numWorkSessions}
          </Text>
          <Text style={styles.label}>Number of Work Sessions</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.number}>
            {Number(currentProject?.stats.totalLongSessions) + numBreaks}
          </Text>
          <Text style={styles.label}>Number of Breaks</Text>
        </View>
        <View style={{ marginBottom: 50 }}>
          <Text
            style={{ ...styles.label, color: "blue" }}
            onPress={() => Linking.openURL(`${currentProject?.projectGitHub}`)}
          >
            Git Hub Project Link
          </Text>
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
    fontFamily: "Nunito_900Black",
  },
  health: {
    marginLeft: 50,
  },
  healthContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 18,
  },
  label: {
    fontFamily: "Nunito_500Medium",
    textAlign: "center",
    fontSize: 25,
    color: COLORS.grey,
    marginBottom: 20,
  },
  level: {
    fontFamily: "Nunito_900Black",
    textAlign: "center",
    fontSize: 35,
    marginBottom: 20,
  },
  number: {
    textAlign: "center",
    fontSize: 40,
    color: COLORS.primary,
    fontFamily: "Nunito_800ExtraBold",
  },
  pet: {
    height: 190,
    width: 190,
    alignSelf: "center",
    marginBottom: 10,
  },
  projectName: {
    textAlign: "center",
    fontSize: 25,
    color: COLORS.primary,
    fontFamily: "Nunito_500Medium",
    marginBottom: 20,
  },
  statsContainer: {
    height: 300,
    marginBottom: 30,
    marginTop: 35,
  },
  statContainer: {
    marginBottom: 18,
  },
});
