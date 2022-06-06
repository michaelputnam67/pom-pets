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
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (modalStatus === true) {
      setModalVisible(true);
    }
  }, [modalStatus]);

  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Modal animationType="fade" visible={modalVisible}>
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
      {/* <Button text="Sign Up" onPress={() => setSignUp(true)} ></Button> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
