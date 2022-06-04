import { Text, Image, View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";

export default function LoginScreen({
  login,
  setPassword,
  setUserName,
  userName,
  password,
}: {
  setPassword: any;
  setUserName: any;
  userName: string;
  password: string;
  login: any;
}) {
  return (
    <SafeAreaView style={styles.container}>
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
          <Button text="Sign In" onPress={login}></Button>
        </View>
      </View>
    </SafeAreaView>
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
    width: 200,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "center",
    textAlign: 'center',
    fontSize: 15,
    margin: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 55,
    marginTop: 50,
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    color: COLORS.primary
  },
  button: {
    marginTop: 20,
    marginBottom: 0,
  }
});
