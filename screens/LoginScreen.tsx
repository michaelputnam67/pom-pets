import { Text, Image, View, StyleSheet, TextInput, Modal, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import Button from "../Components/Button";
import AppLoader from "../Components/AppLoader";
import { COLORS } from "../constants/Colors";
import { useFonts, Nunito_800ExtraBold, Nunito_900Black } from "@expo-google-fonts/nunito";

const { height, width } = Dimensions.get("window");

type LoginScreenProps = {
  userName: string;
  password: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  modalStatus: boolean;
  viewCreateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen : React.FC<LoginScreenProps> = ({
  userName,
  password,
  setUserName,
  setPassword,
  login,
  modalStatus,
  viewCreateProfile,
}) => {
  let fontsLoaded : [boolean, Error | null] = useFonts({
    Nunito_800ExtraBold,
    Nunito_900Black
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

export default LoginScreen;

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
    height: height * 0.06,
    width: width * 0.65,
    margin: height * 0.02,
    textAlign: "center",
  },
  image: {
    alignSelf: "center",
    height: height * 0.3,
    marginBottom: 30,
    width: width * 0.6,
  },
  title: {
    alignSelf: "center",
    color: COLORS.primary,
    fontFamily: "Nunito_900Black",
    fontSize: 55,
    marginTop: height * 0.07,
  },
});
