import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProjectTimer from "../screens/ProjectTimerScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { User, Project, Projects } from "../interface";
import ProjectStatisticsScreen from "../screens/ProjectStatsScreen";
import NewProjectScreen from '../screens/NewProjectScreen';

const Tab = createBottomTabNavigator();

const Tabs = ({
  user,
  logOut,
  projects,
  currentProject,
  updateCurrentProject,
}: {
  projects: Projects | null;
  user: User;
  logOut: any;
  currentProject: Project | undefined;
  updateCurrentProject: any;
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
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
      component={NewProjectScreen}
      // children={(props) => (
      //   <NewProjectScreen  {...props} />
      // )}
      options={{
        tabBarButton: () => null
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
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
          <ProjectTimer currentProject={currentProject} {...props} />
        )}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
          <ProjectStatisticsScreen currentProject={currentProject} {...props} />
        )}
        options={{
          tabBarButton: () => null
        }}
      />

      <Tab.Screen
        name="User"
        children={(props) => (
          <ProfileScreen currentUser={user} logOut={logOut} {...props} />
        )}
        options={{
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
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
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: COLORS.accent,
    borderRadius: 45,
    height: 90,
  },
  tabScreen: {
    width: 70,
    height: 70,
  },
});
