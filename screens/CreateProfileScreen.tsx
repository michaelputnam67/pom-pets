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
      <Text>Create Your Profile</Text>
      <Image source={require("../assets/JoeProfilePicture.png")} />
      <Button
        text="Add Profile Picture"
        onPress={() => {
          console.log("make profile");
        }}
      ></Button>
      <View>
        <Text>Create a username:</Text>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setNewUserName}
          value={newUserName}
          placeholder={"Pomodoro"}
        />
        <Text>Add your email:</Text>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setNewEmail}
          value={newEmail}
          placeholder={"Francesco.Cirillo@PomPets.com"}
        />
        <Text>Create a password:</Text>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder={"password"}
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
    height: 300,
    width: 300,
    alignSelf: "center",
    marginBottom: 30,
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
    margin: 20,
  },
  title: {
    fontSize: 55,
    marginTop: 50,
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    color: COLORS.primary,
  },
  button: {
    marginTop: 20,
    marginBottom: 0,
  },
});
