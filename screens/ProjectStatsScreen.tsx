import { View, SafeAreaView, StyleSheet, Text, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants/Colors";
import { Project } from "../interface";

export default function ProjectStatisticsScreen({
  currentProject,
}: {
  currentProject: Project | undefined;
}) {
  return (
    <SafeAreaView>
      <Text style={styles.header}>Project Statistics</Text>
      <Image
        style={styles.pet}
        source={require("../assets/Pets/PigeonPet.png")}
      />
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
