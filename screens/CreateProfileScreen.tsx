import { Text, StyleSheet, View, TextInput, Image, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";
import ProfilePhoto from "../Components/ProfilePhoto";
import apiCalls from "../apiCalls/apiCalls";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  useFonts,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCEnXq52ByAhEgHbP96fLCf-zHxK9hKgCE",
  authDomain: "pom-pets.firebaseapp.com",
  databaseURL: "https://pom-pets-default-rtdb.firebaseio.com",
  projectId: "pom-pets",
  storageBucket: "pom-pets.appspot.com",
  messagingSenderId: "10853452286",
  appId: "1:10853452286:web:a054f188f2caea662c98af",
  measurementId: "G-RFMCZ0DXYS",
};

const app = initializeApp(firebaseConfig);

export default function CreateProfileScreen() {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [choosingPhoto, setChoosingPhoto] = useState(false);
  const [photo, setPhoto] = useState<any>();

  const goBack = () => {
    setChoosingPhoto(false);
  };

  const usePhoto = async () => {
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    const fileRef = ref(getStorage(), `users/${newUserName}/profile-photo.jpg`);
    const result = await uploadBytes(fileRef, blob);
    const url = await getDownloadURL(result.ref);
    return url;
  };

  const generateNewUser = async () => {
    const url = await usePhoto();
    apiCalls.createNewUser({
      username: newUserName,
      email: newEmail,
      profilePhoto: url,
      settings: {
        workTime: 25,
        shortPomTime: 5,
        longPomTime: 10,
      },
    });
  };

  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Modal animationType="slide" visible={choosingPhoto}>
        <ProfilePhoto photo={photo} setPhoto={setPhoto} goBack={goBack} />
      </Modal>
      <Text style={styles.h1}>Create Your Profile</Text>
      <Image
        style={styles.image}
        source={
          photo
            ? { uri: photo.uri }
            : require("../assets/Icons-Buttons/Profile-Active.png")
        }
      />
      <Button
        text="Add Profile Picture"
        onPress={() => {
          setChoosingPhoto(true);
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
      <Button text="Create Profile" onPress={generateNewUser}></Button>
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
