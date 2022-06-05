import { Text, StyleSheet, View, TextInput, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";
import {
  useFonts,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";

export default function CreateProfileScreen() {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.h1}>Create Your Profile</Text>
      <Image
        style={styles.image}
        source={require("../assets/JoeProfilePicture.png")}
      />
      <Button
        text="Add Profile Picture"
        onPress={() => {
          console.log("snap a pic ;D");
        }}
      ></Button>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Create a username:</Text>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setNewUserName}
          value={newUserName}
          placeholder={"PomodoroLover"}
        />
        <Text style={styles.label}>Add your email:</Text>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setNewEmail}
          value={newEmail}
          placeholder={"francesco.cirillo@pompets.com"}
        />
        <Text style={styles.label}>Create a password:</Text>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder={"password123"}
        />
      </View>
      <Button
        text="Create Profile"
        onPress={() => {
          console.log("make profile");
        }}
      ></Button>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    margin: 20,
  },
  input: {
    height: 50,
    width: "65%",
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 25,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 15,
  },
  label: {
    fontFamily: "Nunito_500Medium",
    textAlign: "center",
    fontSize: 18,
    color: COLORS.grey,
    marginTop: 15,
  },
  inputContainer: {
    margin: 20,
  },
  h1: {
    marginTop: 50,
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    color: COLORS.primary,
    fontSize: 40,
  },
});
