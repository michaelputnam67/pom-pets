import { Alert } from "react-native";
import React, { useState, useEffect } from "react";
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

  const [projectLevel, setProjectLevel] = useState(0)
  const [totalTimeShouldHaveWorked, setTotalTimeShouldHaveWorked] = useState(0);
  const [projectHealth, setProjectHealth] = useState<number | undefined>(0);
  const [totalNegWorkTime, setTotalNegWorkTime] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [totalOverBreakTime, setTotalOverBreakTime] = useState(0);
  const [totalBreakTime, setTotalBreakTime] = useState(0);

  const [numWorkSessions, setNumWorkSessions] = useState(0);
  const [numBreaks, setNumBreaks] = useState(0);

  useEffect(() => {
    if(!currentProject) return
    const workTime = totalWorkTime + Number(currentProject?.stats.totalWorkTime)
    setProjectLevel((Math.floor(workTime/3600)))
  }, [currentProject, user, totalWorkTime])

  useEffect(() => {
    if (!currentProject) return;
    let totalNumberOfBreaks =
      currentProject.stats.totalLongSessions + numBreaks;
    let calculateTotalBreakTime = () => {
      let output = 0;
      for (let i = 1; i <= totalNumberOfBreaks; i++) {
        if (i % 4 === 0) {
          output += userLongPomTime * 60;
        } else {
          output += userShortPomTime * 60;
        }
      }
      return output;
    };
    let totalWorkTimeS =
      totalTimeShouldHaveWorked +
      Number(currentProject?.stats.totalShortSessions);
    let totalBreakTimeS = calculateTotalBreakTime() || 0;

    let calculateHealthModifier = () => {
      let output =
        (totalBreakTime +
          Number(currentProject?.stats.totalLongPomTime) +
          (totalWorkTime + Number(currentProject.stats.totalWorkTime)) +
          totalNegWorkTime +
          totalOverBreakTime) /
        (totalWorkTimeS + totalBreakTimeS);
      return output;
    };
    let healthModifier = Number(Math.abs(1 - (calculateHealthModifier() || 1)));

    if (healthModifier <= 0.25) {
      setProjectHealth(3);
    } else if (healthModifier > 0.25 && healthModifier <= 0.75) {
      setProjectHealth(2);
    } else {
      setProjectHealth(1);
    }
  }, [
    totalTimeShouldHaveWorked,
    totalWorkTime,
    totalBreakTime,
    currentProject,
    numBreaks,
    totalNegWorkTime,
    totalOverBreakTime,
  ]);

  const login = () => {
    if (password === "Password") {
      resetLogin();
      setModalStatus(true);
      apiCalls
        .getUser(`${userName}`)
        .then((data) => {
          if (data.error === "User not found") {
            setModalStatus(false);
            return Alert.alert(data.error);
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
      // setProjectLevel(Number(currentProject?.petLevel))
      setTotalWorkTime(0);
      setTotalNegWorkTime(0);
      setTotalBreakTime(0);
      setTotalOverBreakTime(0);
      setNumBreaks(0);
      setNumWorkSessions(0);
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
      setTotalTimeShouldHaveWorked(0);
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
    if(!user) return

    Alert.alert(
      "Delete Account",
      "This will permanently delete all your account info and all your projects.",
      [
        {
          text: "Yes",
          onPress: () => {
            apiCalls.deleteUser(Number(user.id)).then((res) => {
              logOut();
            })
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const removeProject = (id: number) => {
    if (!pets) {
      return;
    }

    let foundPetIndex: number = 0;

    let newPetList = [...pets];
    newPetList.find((pet, index) => {
      foundPetIndex = index;
      return pet.id === id;
    });
    newPetList.splice(foundPetIndex, 1);

    setPets(newPetList);
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
      Number(currentProject?.stats.totalWorkTime) +
      totalWorkTime +
      totalNegWorkTime;
    const sendBreakTime =
      Number(currentProject?.stats.totalLongPomTime) +
      totalBreakTime +
      totalOverBreakTime;
    const sendWorkSessions =
      Number(currentProject?.stats.totalWorkSessions) + numWorkSessions;
    const sendBreakSessions =
      Number(currentProject?.stats.totalLongSessions) + numBreaks;

    const totalPossibleWorkTime =
      Number(currentProject?.stats.totalShortSessions) +
      totalTimeShouldHaveWorked;

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
    await apiCalls.updateProjectStats(
      { stats: { totalShortSessions: totalPossibleWorkTime } },
      Number(currentProject?.id)
    );
    await apiCalls.updateProjectStats(
      { petHealth: projectHealth },
      Number(currentProject?.id)
    );
    await apiCalls.updateProjectStats(
      { petLevel: projectLevel },
      Number(currentProject?.id)
    )
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
          totalTimeShouldHaveWorked={totalTimeShouldHaveWorked}
          setTotalTimeShouldHaveWorked={setTotalTimeShouldHaveWorked}
          setProjectHealth={setProjectHealth}
          projectHealth={projectHealth}
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
          resetTimerState={resetTimerState}
          projectLevel={projectLevel}
          removeProject={removeProject}
        />
      )}
    </NavigationContainer>
  );
}
