import { SafeAreaView, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/Colors';

const images = [
	{url: require('../assets/Pets/CandlePet.png'), key: 1},
	{url: require('../assets/Pets/PigeonPet.png'), key: 2},
	{url: require('../assets/Pets/TomatoPet.png'), key: 3}
]

export default function NewProjectScreen() {
	const renderIcon = ({ item } : {item : any}) => {
		console.log(item)
		return (
			<Image 
				source={item.url}
			/>
		)
	}

	return (
		<SafeAreaView>
			<Text style={styles.h1}>New Project</Text>
			<View>
				<Text>Choose a Project Icon!</Text>
				<FlatList 
					horizontal={true}
					data={images}
					renderItem={renderIcon}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	h1: {
		fontFamily: "Nunito_900Black",
    alignSelf: "center",
    color: COLORS.primary,
    fontSize: 40,
	}
})