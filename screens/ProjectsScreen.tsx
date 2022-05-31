import { Text, FlatList, Pressable, Image, View } from 'react-native';
import React, {useState} from 'react'
import { petStyles, petsStyles } from '../styles';
import { SafeAreaView } from 'react-native';
import ProjectPet from '../Components/ProjectPet';
import { COLORS } from '../constants/Colors';


export default function ProjectsScreen() {
    const [pets, setPets] = useState([
        {key: 1, image: require('../assets/Pets/PigeonPet.png'), name: 'Pidgeon'},
        {key: 2, image: require('../assets/Pets/TomatoPet.png'), name: 'Tomato'},
        {key: 3, image: require('../assets/Pets/TomatoPet.png'), name: 'Tomato'},
        {key: 4, image: require('../assets/Pets/TomatoPet.png'), name: 'Tomato'},
        {key: 5, image: require('../assets/Pets/TomatoPet.png'), name: 'Tomato'},
        {key: 6, image: require('../assets/Pets/TomatoPet.png'), name: 'Tomato'},
    ])

    const renderPet = ({ item }: {item: { name: string, image: string }}) => (
        <ProjectPet name={ item.name } source={ item.image } />
    ) 

    return (
        <SafeAreaView style = {petsStyles.view}>
            <Text style= {petsStyles.header} >Your Pets</Text>
            <FlatList 
                showsVerticalScrollIndicator={false}            
                ItemSeparatorComponent= {() => (
                    <View style={petStyles.space} ></View>
                )}
                data={pets}
                renderItem={renderPet}
            />
        </SafeAreaView>
    )
}