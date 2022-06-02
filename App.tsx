import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs'


export default function App() {
  return (
    <NavigationContainer>
      {/* <LogInScreen /> */}
      <Tabs />
    </NavigationContainer>
  );
}

