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

  const [totalNegWorkTime, setTotalNegWorkTime] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [totalOverBreakTime, setTotalOverBreakTime] = useState(0);
  const [totalBreakTime, setTotalBreakTime] = useState(0);

  const [numWorkSessions, setNumWorkSessions] = useState(0);
  const [numBreaks, setNumBreaks] = useState(0);

  const login = () => {
    if (password === "Password") {
      resetLogin();
      setModalStatus(true);
      apiCalls
        .getUser(`${userName}`)
        .then((data) => {
          if (data.error === "User not found") {
            setModalStatus(false);
            Alert.alert(data.error);
          }
          setUser(data.data);
          setCurrentProject(data.data.attributes.projects[0]);
          setPets(data.data.attributes.projects);
          setUserWorkTime(data.data.attributes.settings.workTime);
          setUserShortPomTime(data.data.attributes.settings.shortPomTime);
          setUserLongPomTime(data.data.attributes.settings.longPomTime);
        })
        .then(() => {
          setModalStatus(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Alert.alert("Incorrect login information");
    }
  };

  const findProject = (projects: any, res: any) => {
    let output = projects.find((project: any) => {
      return Number(project.id) === Number(res.data.id);
    });
    return output;
  };

  const loadNewProject = async (res: any) => {
    return apiCalls.getUser(`${user?.id}`).then((data) => {
      setUser(data.data);
      setCurrentProject(findProject(data.data.attributes.projects, res));
      setPets(data.data.attributes.projects);
      setUserWorkTime(data.data.attributes.settings.workTime);
      setUserShortPomTime(data.data.attributes.settings.shortPomTime);
      setUserLongPomTime(data.data.attributes.settings.longPomTime);
    });
  };

  const reloadProjectAfterFetch = () => {
    apiCalls.getUser(`${user?.id}`).then((data) => {
      setUser(data.data);
      setPets(data.data.attributes.projects);
      setUserWorkTime(data.data.attributes.settings.workTime);
      setUserShortPomTime(data.data.attributes.settings.shortPomTime);
      setUserLongPomTime(data.data.attributes.settings.longPomTime);
      setTotalWorkTime(0);
      setTotalNegWorkTime(0);
      setTotalBreakTime(0);
      setTotalOverBreakTime(0);
      setNumBreaks(0);
      setNumWorkSessions(0);
    });
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
    return apiCalls.createProject(post);
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

  const deleteUser = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Yes",
          onPress: () => {
            //DELETE Request
            logOut();
          },
        },
        {
          text: "No",
          onPress: () => console.log("Nope, did not delete account"),
        },
      ]
    );
  };

  const updateCurrentProject = async (item: any) => {
    await resetTimerState();
    if (!pets) {
      return;
    }
    const project: Project | undefined = pets.find((pet) => {
      return item.id === pet.id;
    });
    setCurrentProject(project);
    reloadProjectAfterFetch();
  };

  const updateTimerStats = (newState: number, state: string) => {
    if (state === "workTime") {
      setTotalWorkTime(totalWorkTime + newState);
    } else if (state === "negWorkTime") {
      setTotalNegWorkTime(totalNegWorkTime + newState);
    } else if (state === "breakTime") {
      setTotalBreakTime(totalBreakTime + newState);
    } else if (state === "overBreakTime") {
      setTotalOverBreakTime(totalOverBreakTime + newState);
    }
  };

  const updateSessionCount = (addWork: number, addBreak: number) => {
    setNumWorkSessions(numWorkSessions + addWork);
    setNumBreaks(numBreaks + addBreak);
  };

  const resetTimerState = async () => {
    const sendWorkTime =
      Number(currentProject?.stats.totalWorkTime) + totalWorkTime;
    const sendBreakTime =
      Number(currentProject?.stats.totalLongPomTime) + totalBreakTime;
    const sendWorkSessions =
      Number(currentProject?.stats.totalWorkSessions) + numWorkSessions;
    const sendBreakSessions =
      Number(currentProject?.stats.totalLongSessions) + numBreaks;

    await apiCalls.updateProjectStats(
      { stats: { totalWorkTime: sendWorkTime } },
      Number(currentProject?.id)
    );
    await apiCalls.updateProjectStats(
      { stats: { totalLongPomTime: sendBreakTime } },
      Number(currentProject?.id)
    );
    await apiCalls.updateProjectStats(
      { stats: { totalLongSessions: sendBreakSessions } },
      Number(currentProject?.id)
    );
    await apiCalls.updateProjectStats(
      { stats: { totalWorkSessions: sendWorkSessions } },
      Number(currentProject?.id)
    );
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
      {createProfile && (
        <CreateProfileScreen
          viewCreateProfile={viewCreateProfile}
        ></CreateProfileScreen>
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
          createNewProject={createNewProject}
          userWorkTime={userWorkTime}
          userShortPomTime={userShortPomTime}
          userLongPomTime={userLongPomTime}
          loadNewProject={loadNewProject}
          totalWorkTime={totalWorkTime}
          totalNegWorkTime={totalNegWorkTime}
          totalBreakTime={totalBreakTime}
          totalOverBreakTime={totalOverBreakTime}
          updateTimerStats={updateTimerStats}
          numBreaks={numBreaks}
          numWorkSessions={numWorkSessions}
          updateSessionCount={updateSessionCount}
          deleteUser={deleteUser}
        />
      )}
    </NavigationContainer>
  );
}
