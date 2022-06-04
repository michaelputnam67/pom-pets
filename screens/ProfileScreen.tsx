import { Text, View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Button from "../Components/Button";
import ButtonGroup from "../Components/ButtonGroup";
import { User, Attributes } from "../interface";
import { COLORS } from "../constants/Colors";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";

export default function ProfileScreen({
  logOut,
  currentUser,
}: {
  logOut: any;
  currentUser: User;
}) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const setTimeSetting = () => {
    console.log("yeet");
  };

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.h1}>User Profile</Text>
      <Image
        style={styles.image}
        source={require("../assets/JoeProfilePicture.png")}
      />
      <View style={styles.userInfoContainer}>
        <Text style={styles.h2}>Username:</Text>
        <Text style={styles.h3}>{`${currentUser.attributes.username}`}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.h2}>Email:</Text>
        <Text style={styles.h3}>{`${currentUser.attributes.email}`}</Text>
      </View>
      <Text style={styles.h4}>Work Time</Text>
      <ButtonGroup
        onPress1={setTimeSetting}
        onPress2={setTimeSetting}
        onPress3={setTimeSetting}
        text1="15 mins"
        text2="25 mins"
        text3="35 mins"
      ></ButtonGroup>
      <Text style={styles.h4}>Short Pom Time</Text>
      <ButtonGroup
        onPress1={setTimeSetting}
        onPress2={setTimeSetting}
        onPress3={setTimeSetting}
        text1="2 mins"
        text2="5 mins"
        text3="10 mins"
      ></ButtonGroup>
      <Text style={styles.h4}>Long Pom Time</Text>
      <ButtonGroup
        onPress1={setTimeSetting}
        onPress2={setTimeSetting}
        onPress3={setTimeSetting}
        text1="10 mins"
        text2="15 mins"
        text3="20 mins"
      ></ButtonGroup>
      <Button text="Sign Out" onPress={logOut}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    color: COLORS.primary,
    fontSize: 40,
    marginBottom: 30,
  },
  h2: {
    fontFamily: "Nunito_800ExtraBold",
    color: COLORS.secondary,
    fontSize: 25,
    marginRight: 25,
  },
  h3: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 18,
  },
  h4: {
    fontFamily: "Nunito_800ExtraBold",
    color: COLORS.grey,
    fontSize: 18,
  },
  userInfoContainer: {
    flexDirection: "row",
    width: "75%",
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    height: 180,
    width: 180,
    alignSelf: "center",
    marginBottom: 30,
  },
  view: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
