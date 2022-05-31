import {View, Text, Image, Pressable } from 'react-native';
import { petStyles } from '../styles'
import React from 'react';

export default function ProjectPet ({ source, name }: { source: any, name: string }) {
	return (
		<Pressable style={petStyles.main} >
			<Pressable style={petStyles.deleteButtonContainer} >
				<Image style={petStyles.deleteButton} source={require('../assets/Icons-Buttons/DeleteBtn.png')} />
			</Pressable>
			<Image style={petStyles.image} source={source}/>
			<Text style={petStyles.text} >{name}</Text>
		</Pressable>
	)
}