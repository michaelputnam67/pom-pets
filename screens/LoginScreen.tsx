import { Text, Button, Image, View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";

export default function LoginScreen({ login, setPassword, setUserName, userName, password } : {setPassword: any, setUserName: any, userName: string, password: string, login: any}) {

  return (
    <SafeAreaView style={styles.container} > 
			<View>
				<Text>Pom Pets</Text>
				<Image style={styles.image} source={require('../assets/Pets/TomatoPet-Sad.png')} />
				<TextInput  
					autoCapitalize={"none"}
					style={styles.input}
					onChangeText={setUserName}
					value={userName}
					placeholder={'username'}
				/>
				<TextInput 
					autoCapitalize={"none"}
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					placeholder={'password'}
				/>
				<Button title="please click me to login" onPress={login} />
			</View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		height: 250,
		width: 250,
		alignSelf: 'center',
	},
	input: {
		height: 50,
		width: 100,
		borderColor: 'black',
		alignSelf: 'center',
	}
})