import { Text, View } from 'react-native';
import React from 'react'
import { petsStyles } from '../styles';
import { SafeAreaView } from 'react-native';

export default function ProjectsScreen() {
    return (
        <SafeAreaView style= {petsStyles.view}>
            <Text style= {petsStyles.header} >Your Pets</Text>
        </SafeAreaView>
    )
}