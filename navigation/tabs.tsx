import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProjectsScreen from "../screens/ProjectsScreen";
import ProjectTimer from "../screens/ProjectTimerScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...navStyles.tabNavigator },
      }}
    >
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: false,
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
        component={ProjectsScreen}
        options={{
          headerShown: false,
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
        component={ProjectTimer}
        options={{
          headerShown: false,
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
        component={ProfileScreen}
        options={{
          headerShown: false,
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
    bottom: 25,
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
