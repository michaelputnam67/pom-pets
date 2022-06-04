import React, { useEffect, useState } from "react";
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
      apiCalls.getUser().then((data) => {
        setUser(data.data);
        setCurrentProject(data.data.attributes.projects[0]);
        setPets(data.data.attributes.projects);
      });
    }
  };

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
        />
      )}
    </NavigationContainer>
  );
}
