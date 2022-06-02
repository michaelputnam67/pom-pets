import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { User } from './interface';
import Tabs from './navigation/tabs';
import apiCalls from './apiCalls/apiCalls';
import LoginScreen from './screens/LoginScreen';

 
export default function App() {
  const [userName, setUserName] = useState('Ross')
	const [password, setPassword] = useState('Van')
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
		if(userName === 'Ross' && password === 'Van') {
			apiCalls.getUser().then((data) => setUser(data.data));
		}
	}
  
  return (
    <NavigationContainer>
      {!user && <LoginScreen userName={userName} password={password} setUserName={setUserName} setPassword={setPassword} login={login} />}
      {user && <Tabs />}
    </NavigationContainer>
  );
}

