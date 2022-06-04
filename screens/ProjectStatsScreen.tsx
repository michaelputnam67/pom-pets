import { View, SafeAreaView, StyleSheet, Text, Image } from "react-native";
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
    <SafeAreaView>
      <Text style={styles.header}>Project Statistics</Text>
      <Image
        style={styles.pet}
        source={
          currentProject?.petImage === "tomato-image"
            ? require("../assets/Pets/TomatoPet.png")
            : require("../assets/Pets/PigeonPet.png")
        }
      />
      <Text>Project Name: {currentProject?.projectName}</Text>
      <Button text="to training" onPress={toTraining}></Button>
      <View>
        <Text>Level {currentProject?.petLevel}</Text>
      </View>
      <View>
        <Text>Health</Text>
        <HealthIcons health={currentProject?.petHealth} />
      </View>
      <View>
        <RenderTime time={currentProject?.stats.totalWorkTime} />
        <Text>total training time</Text>
      </View>
      <View>
        <RenderTime time={currentProject?.stats.totalLongPomTime} />
        <Text>total long pom time</Text>
      </View>
      <View>
        <RenderTime time={currentProject?.stats.totalShortPomTime} />
        <Text>total short pom time</Text>
      </View>
      <View>
        <Text>{currentProject?.stats.totalWorkSessions}</Text>
        <Text>number of work sessions</Text>
      </View>
      <View>
        <Text>{currentProject?.stats.totalShortSessions}</Text>
        <Text>number of short breaks</Text>
      </View>
      <View>
        <Text
          onPress={() => Linking.openURL(`${currentProject?.projectGitHub}`)}
        >
          {" "}
          {currentProject?.projectGitHub}{" "}
        </Text>
        <Text>Git Hub Project Link</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    fontSize: 40,
    color: COLORS.primary,
  },
  pet: {
    height: 280,
    width: 280,
    alignSelf: "center",
    marginBottom: 30,
  },
});
