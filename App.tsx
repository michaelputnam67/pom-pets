import {Text, StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { User, Project, Projects, Pet } from "./interface";
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
  const [userWorkTime, setUserWorkTime] = useState(
    user?.attributes.settings.workTime
  );
  const [userShortPomTime, setUserShortPomTime] = useState(
    user?.attributes.settings.shortPomTime
  );
  const [userLongPomTime, setUserLongPomTime] = useState(
    user?.attributes.settings.longPomTime
  );

  
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

  const createNewProject = (pet: Pet, projectName: string, gitHubUrl: string ) => {
    const post = {
      projectName: projectName,
      petHealth: 3,
      petLevel: 1,
      projectPet: pet.image,
      projectGitHub: gitHubUrl,
      petImage: pet.name,
      "user_id": user?.id,
      stats: {
        totalWorkTime: 0,
        totalWorkSessions: 0,
        totalShortPomTime: 0,
        totalShortSessions: 0,
        totalLongPomTime: 0,
        totalLongSessions: 0
      }
    }
    apiCalls.createProject(post)
  }
  
  const setWorkTime = (text: number) => {
    setUserWorkTime(text);
    apiCalls.updateUser({ settings: { workTime: `${text}` } });
  };

  const setShortPomTime = (text: number) => {
    setUserShortPomTime(text);
    apiCalls.updateUser({ settings: { shortPomTime: `${text}` } });
  };

  const setLongPomTime = (text: number) => {
    setUserLongPomTime(text);
    apiCalls.updateUser({ settings: { longPomTime: `${text}` } });
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
          setWorkTime={setWorkTime}
          setShortPomTime={setShortPomTime}
          setLongPomTime={setLongPomTime}
          createNewProject={createNewProject}
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
