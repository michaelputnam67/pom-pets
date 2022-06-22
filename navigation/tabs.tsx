import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/Colors";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProjectTimer from "../screens/ProjectTimerScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { User, Project, Projects } from "../interface";
import ProjectStatisticsScreen from "../screens/ProjectStatsScreen";
import NewProjectScreen from "../screens/NewProjectScreen";

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get("window");

const Tabs = ({
  totalTimeShouldHaveWorked,
  setTotalTimeShouldHaveWorked,
  projectHealth,
  setProjectHealth,
  user,
  logOut,
  projects,
  currentProject,
  updateCurrentProject,
  setWorkTime,
  setShortPomTime,
  setLongPomTime,
  createNewProject,
  userWorkTime,
  userShortPomTime,
  userLongPomTime,
  loadNewProject,
  totalWorkTime,
  totalNegWorkTime,
  totalBreakTime,
  totalOverBreakTime,
  updateTimerStats,
  numBreaks,
  numWorkSessions,
  updateSessionCount,
  resetTimerState
}: {
  totalTimeShouldHaveWorked: number;
  setTotalTimeShouldHaveWorked: any;
  projectHealth: number | undefined;
  setProjectHealth: any;
  projects: Projects | null;
  user: User;
  logOut: any;
  currentProject: Project | undefined;
  updateCurrentProject: any;
  setWorkTime: any;
  setShortPomTime: any;
  setLongPomTime: any;
  createNewProject: any;
  userWorkTime: any;
  userShortPomTime: any;
  userLongPomTime: any;
  loadNewProject: any;
  totalWorkTime: number;
  totalNegWorkTime: number;
  totalBreakTime: number;
  totalOverBreakTime: number;
  updateTimerStats: any;
  numBreaks: number;
  numWorkSessions: number;
  updateSessionCount: any;
  resetTimerState: any
}) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={false}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { ...navStyles.tabNavigator },
      }}
    >
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: height * 0.03,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/Icons-Buttons/Info-Active.png")}
                resizeMode="contain"
                style={{
                  ...navStyles.tabScreen,
                  tintColor: focused ? COLORS.primary : COLORS.white,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="New Project"
        children={(props) => (
          <NewProjectScreen
            createNewProject={createNewProject}
            loadNewProject={loadNewProject}
            resetTimerState={resetTimerState}
            {...props}
          />
        )}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Your Pets"
        children={(props) => (
          <ProjectsScreen
            projects={projects}
            updateCurrentProject={updateCurrentProject}
            {...props}
          />
        )}
        options={{
          tabBarShowLabel: false,
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: height * 0.03,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/Icons-Buttons/PetIcon-Active.png")}
                resizeMode="contain"
                style={{
                  ...navStyles.tabScreen,
                  tintColor: focused ? COLORS.primary : COLORS.white,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pet"
        children={(props) => (
          <ProjectTimer
            totalTimeShouldHaveWorked={totalTimeShouldHaveWorked}
            setTotalTimeShouldHaveWorked={setTotalTimeShouldHaveWorked}
            projectHealth={projectHealth}
            setProjectHealth={setProjectHealth}
            updateSessionCount={updateSessionCount}
            numBreaks={numBreaks}
            numWorkSessions={numWorkSessions}
            updateTimerStats={updateTimerStats}
            totalWorkTime={totalWorkTime}
            totalNegWorkTime={totalNegWorkTime}
            totalBreakTime={totalBreakTime}
            totalOverBreakTime={totalOverBreakTime}
            currentProject={currentProject}
            userWorkTime={userWorkTime}
            userShortPomTime={userShortPomTime}
            userLongPomTime={userLongPomTime}
            {...props}
          />
        )}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: height * 0.03,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/Icons-Buttons/TimerIcon-Active.png")}
                resizeMode="contain"
                style={{
                  ...navStyles.tabScreen,
                  tintColor: focused ? COLORS.primary : COLORS.white,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Stats"
        children={(props) => (
          <ProjectStatisticsScreen
            numBreaks={numBreaks}
            numWorkSessions={numWorkSessions}
            totalWorkTime={totalWorkTime}
            totalBreakTime={totalBreakTime}
            currentProject={currentProject}
            {...props}
          />
        )}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="User"
        children={(props) => (
          <ProfileScreen
            currentUser={user}
            logOut={logOut}
            setWorkTime={setWorkTime}
            setShortPomTime={setShortPomTime}
            setLongPomTime={setLongPomTime}
            {...props}
          />
        )}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: height * 0.03,
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/Icons-Buttons/Profile-Active.png")}
                resizeMode="contain"
                style={{
                  ...navStyles.tabScreen,
                  tintColor: focused ? COLORS.primary : COLORS.white,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const navStyles = StyleSheet.create({
  tabNavigator: {
    position: "absolute",
    bottom: height * 0.02,
    left: width * 0.055,
    right: width * 0.055,
    elevation: 0,
    backgroundColor: COLORS.accent,
    borderRadius: 45,
    height: height * 0.1,
  },
  tabScreen: {
    width: width * 0.2,
    height: height * 0.08,
  },
});
