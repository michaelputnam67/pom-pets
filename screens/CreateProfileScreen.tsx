import { Text, StyleSheet, View, TextInput, Image, Modal, Alert, Dimensions, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";
import ProfilePhoto from "../Components/ProfilePhoto";
import apiCalls from "../apiCalls/apiCalls";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFonts, Nunito_500Medium, Nunito_800ExtraBold, Nunito_900Black } from "@expo-google-fonts/nunito";
import { initializeApp } from "firebase/app";
import AppLoader from "../Components/AppLoader";

type FirebaseConfig = {
  apiKey: string,
  authDomain: string,
  databaseURL: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId: string
}

type CreateProfileScreenProps = {
  viewCreateProfile: React.Dispatch<React.SetStateAction<boolean>>
}

const firebaseConfig : FirebaseConfig = {
  apiKey: "AIzaSyCEnXq52ByAhEgHbP96fLCf-zHxK9hKgCE",
  authDomain: "pom-pets.firebaseapp.com",
  databaseURL: "https://pom-pets-default-rtdb.firebaseio.com",
  projectId: "pom-pets",
  storageBucket: "pom-pets.appspot.com",
  messagingSenderId: "10853452286",
  appId: "1:10853452286:web:a054f188f2caea662c98af",
  measurementId: "G-RFMCZ0DXYS"
};

const app = initializeApp(firebaseConfig);
const { height, width } = Dimensions.get("window");

const CreateProfileScreen : React.FC<CreateProfileScreenProps> = ({
  viewCreateProfile
}) => {
  const [newUserName, setNewUserName] = useState<string | undefined>(undefined);
  const [newEmail, setNewEmail] = useState<string | undefined>(undefined);
  const [choosingPhoto, setChoosingPhoto] = useState(false);
  const [photo, setPhoto] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const goBack : () => void = () => {
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
    if (!newUserName || !newEmail) {
      return Alert.alert("Check your inputs!");
    }
    const url = await usePhoto();
    setLoading(true);
    apiCalls
      .createNewUser({
        username: newUserName,
        email: newEmail,
        profilePhoto: url,
        settings: {
          workTime: 25,
          shortPomTime: 5,
          longPomTime: 10,
        },
      })
      .then(() => {
        setLoading(false);
        viewCreateProfile(false);
      });
  };

  let [fontsLoaded] : [boolean, Error | null] = useFonts({
    Nunito_500Medium,
    Nunito_800ExtraBold,
    Nunito_900Black
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Modal animationType="fade" visible={loading}>
        <AppLoader></AppLoader>
      </Modal>
      <Modal animationType="slide" visible={choosingPhoto}>
        <ProfilePhoto photo={photo} setPhoto={setPhoto} goBack={goBack} />
      </Modal>
      <Pressable
        style={styles.goBackPressable}
        onPress={() => viewCreateProfile(false)}
      >
        <Image
          style={styles.backButton}
          source={require("../assets/Icons-Buttons/ViewLeftBtn.png")}
        />
        <Text style={styles.h3}>back to login</Text>
      </Pressable>
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
      </View>
      <Button text="Create Profile" onPress={generateNewUser}></Button>
    </KeyboardAwareScrollView>
  );
}

export default CreateProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  h1: {
    alignSelf: "center",
    color: COLORS.primary,
    fontFamily: "Nunito_900Black",
    fontSize: 35,
    marginTop: height * 0.02,
  },
  image: {
    alignSelf: "center",
    height: height * 0.25,
    margin: 10,
    width: width * 0.5,
  },
  input: {
    alignSelf: "center",
    borderColor: COLORS.grey,
    borderRadius: 25,
    borderWidth: 1,
    fontSize: 15,
    height: height * 0.06,
    width: width * 0.65,
    textAlign: "center",
  },
  inputContainer: {
    margin: 15,
  },
  label: {
    color: COLORS.grey,
    fontFamily: "Nunito_500Medium",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 8,
    textAlign: "center",
  },
  goBackPressable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width * 0.8,
    marginTop: height * 0.05,
    marginLeft: width * 0.07,
  },
  h3: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
    color: COLORS.grey,
    margin: 8,
  },
  backButton: {
    height: height / 25,
    width: width / 25,
  },
});
