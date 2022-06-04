import React, { useState } from "react";
import {Text, StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { User, Project, Projects } from "./interface";
import Tabs from "./navigation/tabs";
import apiCalls from "./apiCalls/apiCalls";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  const [userName, setUserName] = useState("JoeRupp");
  const [password, setPassword] = useState("PigeonsRLife");
  const [user, setUser] = useState<User | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );
  const [loginError, setLoginError] = useState(false)
  const [pets, setPets] = useState<Projects | null>(null);

  const login = () => {
    if (userName === "JoeRupp" && password === "PigeonsRLife") {
      setLoginError(false)
      apiCalls.getUser().then((data) => {
        setUser(data.data);
        setCurrentProject(data.data.attributes.projects[0]);
        setPets(data.data.attributes.projects);
      });
    } else {
      setLoginError(true)
    }
  };

  const logOut = () => {
    setUser(null);
  };

  const updateCurrentProject = (item: any) => {
    if (!pets) {
      return;
    }
    const project: Project | undefined = pets.find((pet) => {
      return item.id === pet.id;
    });
    setCurrentProject(project);
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
      {loginError && <Text style={styles.error}>Invalid Username or Password</Text>}
      {user && (
        <Tabs
          updateCurrentProject={updateCurrentProject}
          currentProject={currentProject}
          projects={pets}
          user={user}
          logOut={logOut}
        />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create ({
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 75,
    fontSize: 20,
  }
})
