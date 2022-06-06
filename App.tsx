import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { User, Project, Projects, Pet } from "./interface";
import Tabs from "./navigation/tabs";
import apiCalls from "./apiCalls/apiCalls";
import LoginScreen from "./screens/LoginScreen";




import CreateProfileScreen from "./screens/CreateProfileScreen";

export default function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );
  const [pets, setPets] = useState<Projects | null>(null);
  const [userWorkTime, setUserWorkTime] = useState(0);
  const [userShortPomTime, setUserShortPomTime] = useState(0);
  const [userLongPomTime, setUserLongPomTime] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [createProfile, viewCreateProfile] = useState(false);

  const resetLogin = () => {
    setUserName("");
    setPassword("");
  };

  const login = () => {
    if (password === "Password") {
      resetLogin();
      setModalStatus(true);
      apiCalls
        .getUser(`${userName}`, setModalStatus)
        .then((data) => {
          setUser(data.data);
          setCurrentProject(data.data.attributes.projects[0]);
          setPets(data.data.attributes.projects);
          setUserWorkTime(data.data.attributes.settings.workTime);
          setUserShortPomTime(data.data.attributes.settings.shortPomTime);
          setUserLongPomTime(data.data.attributes.settings.longPomTime);
        }).catch(err => Alert.alert(err))
        .then(() => {
          setModalStatus(false)
        } 
        );
    } else {
      Alert.alert("Incorrect login information");
    }
  };

  const createNewProject = (
    pet: Pet,
    projectName: string,
    gitHubUrl: string
  ) => {
    const post = {
      projectName: projectName,
      petHealth: 3,
      petLevel: 1,
      projectPet: pet.image,
      projectGitHub: gitHubUrl,
      petImage: pet.name,
      user_id: user?.id,
      stats: {
        totalWorkTime: 0,
        totalWorkSessions: 0,
        totalShortPomTime: 0,
        totalShortSessions: 0,
        totalLongPomTime: 0,
        totalLongSessions: 0,
      },
    };
    apiCalls.createProject(post);
  };

  const setWorkTime = (text: number) => {
    setUserWorkTime(text);
    apiCalls.updateUser({ settings: { workTime: `${text}` } }, user?.id);
  };

  const setShortPomTime = (text: number) => {
    setUserShortPomTime(text);
    apiCalls.updateUser({ settings: { shortPomTime: `${text}` } }, user?.id);
  };

  const setLongPomTime = (text: number) => {
    setUserLongPomTime(text);
    apiCalls.updateUser({ settings: { longPomTime: `${text}` } }, user?.id);
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
      {!user && !createProfile && (
        <LoginScreen
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
          login={login}
          modalStatus={modalStatus}
          viewCreateProfile={viewCreateProfile}
        />
      )}
      {createProfile && <CreateProfileScreen></CreateProfileScreen>}
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
          userWorkTime={userWorkTime}
          userShortPomTime={userShortPomTime}
          userLongPomTime={userLongPomTime}
        />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 75,
    fontSize: 20,
  },
});
