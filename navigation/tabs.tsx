import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProjectTimer from '../screens/ProjectTimer'
import { View, Image, Text} from 'react-native'
import {navStyles, petsStyles} from '../styles'

	const Tab = createBottomTabNavigator();

	const Tabs = () => {
		return (
			<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: { ...navStyles.tabNavigator }
			}}>
			<Tab.Screen name="Your Pets" component= {ProjectsScreen} options= { {
				headerShown: false,
				tabBarIcon: ({focused}) => (
				<View style={{ alignItems: 'center', justifyContent: 'center', top: 10}}>
					<Image 
							source={require('../assets/Icons-Buttons/PetIcon-Active.png')}
							resizeMode='contain'
							style={{
								...navStyles.tabScreen,
								tintColor: focused ? "#EA3323" : 'black',
							}}
					/>
				</View>
				)}
			} />
			<Tab.Screen name="Pet" component= {ProjectTimer} options= { {
				tabBarIcon: ({focused}) => (
				<View style={{ alignItems: 'center', justifyContent: 'center', top: 10}}>
					<Image 
						source={require('../assets/Icons-Buttons/TimerIcon-Active.png')}
						resizeMode='contain'
						style={{
							...navStyles.tabScreen,
							tintColor: focused ? "#EA3323" : 'black',
						}}
					/>
				</View>
				)}
			} />
			</Tab.Navigator>
		)
}

export default Tabs