import { Text, Button, Image, View, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import apiCalls from "../apiCalls/apiCalls";
import { User, Attributes } from '../interface';
import Tabs from '../navigation/tabs';
import {COLORS} from '../constants/Colors';

export default function LoginScreen() {
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null);

	const login = () => {
		if(userName === 'RossInAVan' && password === 'Iamavan') {
			apiCalls.getUser().then((data) => setUser(data.data));
		}
	}

  return (
    <SafeAreaView style={styles.container} > 
			{!user && <View>
				<Text>Pom Pets</Text>
				<Image style={styles.image} source={require('../assets/Pets/TomatoPet-Sad.png')} />
				<TextInput  
					style={styles.input}
					onChangeText={setUserName}
					value={userName}
					placeholder={'username'}
				/>
				<TextInput 
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					placeholder={'password'}
				/>
				<Button title="please click me to login" onPress={login} />
			</View>}
			{user && <Tabs />}
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