import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { User } from "./interface";
import Tabs from "./navigation/tabs";
import apiCalls from "./apiCalls/apiCalls";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [userName, setUserName] = useState("JoeRupp");
  const [password, setPassword] = useState("PigeonsRLife");
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    if (userName === "JoeRupp" && password === "PigeonsRLife") {
      apiCalls.getUser().then((data) => setUser(data.data));
    }
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <NavigationContainer>
      {!user && (
        <LoginScreen
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
          login={login}
        />
      )}
      {user && <Tabs user={user} logOut={logOut} />}
    </NavigationContainer>
  );
}

// let [fontsLoaded] = useFonts({
//   Inter_100Thin,
//   Inter_200ExtraLight,
//   Inter_300Light,
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   Inter_800ExtraBold,
//   Inter_900Black,
// });

// if (!fontsLoaded) {
//   return <></>;
// }

// import {
//   useFonts,
//   Inter_100Thin,
//   Inter_200ExtraLight,
//   Inter_300Light,
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   Inter_800ExtraBold,
//   Inter_900Black,
// } from "@expo-google-fonts/inter";
