import { Text, FlatList, Pressable, Image, View } from 'react-native';
import React, {useState} from 'react'
import { petsStyles, petStyles } from '../styles';
import { SafeAreaView } from 'react-native';
import ProjectPet from '../Components/ProjectPet';


export default function ProjectsScreen() {
    const [pets, setPets] = useState([
        {key: 1, image: require('../assets/Pets/PigeonPet.png'), name: 'Pidgeon'},
        {key: 2, image: require('../assets/Pets/TomatoPet.png'), name: 'Tomato'}
    ])

    const renderPet = ({ item }: { item: any}) => (
        <ProjectPet name={ item.name } source={ item.image } />
    ) 

    return (
        <SafeAreaView style = {petsStyles.view}>
            <Text style= {petsStyles.header} >Your Pets</Text>
            <FlatList 
                ItemSeparatorComponent= {() => (
                    <View style={petStyles.space} ></View>
                )}
                data={pets}
                renderItem={renderPet}
            />
        </SafeAreaView>
    )
}