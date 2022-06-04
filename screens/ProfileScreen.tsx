import { Text, View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Button from "../Components/Button";
import ButtonGroup from "../Components/ButtonGroup";
import { User, Attributes } from "../interface";
import { COLORS } from "../constants/Colors";
import {
  useFonts,
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
  const [userWorkTime, setuserWorkTime] = useState(
    currentUser.attributes.settings.workTime
  );
  const [userShortPomTime, setuserShortPomTime] = useState(
    currentUser.attributes.settings.shortPomTime
  );
  const [userLongPomTime, setuserLongPomTime] = useState(
    currentUser.attributes.settings.longPomTime
  );

  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const setWorkTime = (text) => {
    setuserWorkTime(text);
  };

  const setShortPomTime = (text) => {
    setuserShortPomTime(text);
  };

  const setLongPomTime = (text) => {
    setuserLongPomTime(text);
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
        currentlyActive={`${userWorkTime}`}
        onPress={setWorkTime}
        text1="15"
        text2="25"
        text3="35"
      ></ButtonGroup>
      <Text style={styles.h4}>Short Pom Time</Text>
      <ButtonGroup
        currentlyActive={`${userShortPomTime}`}
        onPress={setShortPomTime}
        text1="2"
        text2="5"
        text3="10"
      ></ButtonGroup>
      <Text style={styles.h4}>Long Pom Time</Text>
      <ButtonGroup
        currentlyActive={`${userLongPomTime}`}
        onPress={setLongPomTime}
        text1="10"
        text2="15"
        text3="20"
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
