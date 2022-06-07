import { Text, Image, View, StyleSheet, TextInput, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import AppLoader from "../Components/AppLoader";
import { COLORS } from "../constants/Colors";
import {
  useFonts,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";

export default function LoginScreen({
  login,
  setPassword,
  setUserName,
  userName,
  password,
  modalStatus,
  viewCreateProfile,
}: {
  viewCreateProfile: any;
  setPassword: any;
  setUserName: any;
  userName: string;
  password: string;
  login: any;
  modalStatus: boolean;
}) {

  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Modal animationType="fade" visible={modalStatus}>
        <AppLoader></AppLoader>
      </Modal>
      <View>
        <Text style={styles.title}>Pom Pets</Text>
        <Image
          style={styles.image}
          source={require("../assets/Pets/TomatoPet.png")}
        />
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder={"username"}
        />
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={"password"}
        />
        <View style={styles.button}>
          <Button
            text="Sign In"
            onPress={() => {
              login();
            }}
          ></Button>
          <Button
            text="Create Profile"
            onPress={() => {
              viewCreateProfile(true);
            }}
          ></Button>

        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 0,
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  input: {
    alignSelf: "center",
    borderColor: COLORS.grey,
    borderRadius: 25,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    margin: 20,
    textAlign: "center",
    width: "65%",
  },
  image: {
    alignSelf: "center",
    height: 300,
    marginBottom: 30,
    width: 300,
  },
  title: {
    alignSelf: "center",
    color: COLORS.primary,
    fontFamily: "Nunito_900Black",
    fontSize: 55,
    marginTop: 50,
  },
});
