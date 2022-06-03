// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProjectTimer from "../screens/ProjectTimerScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { User } from "../interface";

const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

const Tabs = ({ user, logOut }: { user: User; logOut: any }) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={false}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        // tabBarIndicatorStyle: { backgroundColor: "transparent" },
        // tabBarIndicatorContainerStyle: null,
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
        name="Your Pets"
        children={(props) => (
          <ProjectsScreen projects={user.attributes.projects} {...props} />
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
        children={() => (
          <ProjectTimer currentProject={user.attributes.projects[0]} />
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
        name="User"
        children={(props) => (
          <ProfileScreen user={user} logOut={logOut} {...props} />
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
