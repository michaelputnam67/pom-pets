import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectsPage from './Components/ProjectsPage';
import MaterialCommunityIcons from './node_modules/react-native-vector-icons/MaterialCommunityIcons'


export default function App() {

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Projects" component= {ProjectsPage} options= { {
          tabBarLabel: "Projects",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
          }
        } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

