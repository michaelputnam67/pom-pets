import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectsPage from './Components/ProjectsPage';
import { View, Image, Text} from 'react-native'


export default function App() {

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel:false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: 'grey',
            borderRadius: 10,
            height: 90,
          }
        }}>
        <Tab.Screen name="Projects" component= {ProjectsPage} options= { {
          tabBarIcon: ({focused}) => (
           <View style={{ alignItems: 'center', justifyContent: 'center', top: 10}}>
             <Image 
                source={require('./assets/Icons-Buttons/PetIcon-Active.png')}
                resizeMode='contain'
                style={{
                  width: 70,
                  height: 70,
                  tintColor: focused ? 'red' : 'black',
                }}
                />
           </View>
          )}
        } />
        <Tab.Screen name="User" component= {ProjectsPage} options= { {
          tabBarIcon: ({focused}) => (
           <View style={{ alignItems: 'center', justifyContent: 'center', top: 10}}>
             <Image 
                source={require('./assets/Icons-Buttons/Profile-Active.png')}
                resizeMode='contain'
                style={{
                  width: 70,
                  height: 70,
                  tintColor: focused ? 'red' : 'black',
                }}
                />
           </View>
          )}
        } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

