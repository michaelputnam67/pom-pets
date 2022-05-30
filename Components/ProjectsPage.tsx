import { Text, View } from 'react-native';
import React from 'react'
import styles from '../styles';
import { SafeAreaView } from 'react-native';

export default function ProjectsPage() {
    
    return (
        <SafeAreaView>
            <View style= {styles.projectsPage}>
                <Text style= {styles.projectsPage.text1} >Home Page</Text>
                <Text style= {styles.projectsPage} >NEW TEXT</Text>
            </View>
        </SafeAreaView>
    )
}