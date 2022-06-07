import {
  Text,
  FlatList,
  Pressable,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import ProjectPet from "../Components/ProjectPet";
import { COLORS } from "../constants/Colors";
import { Projects } from "../interface";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";

export default function ProjectsScreen({
  navigation,
  projects,
  updateCurrentProject,
  resetTimerState,
}: {
  updateCurrentProject: any;
  navigation?: any;
  projects: Projects | null;
  resetTimerState: any;
}) {
  let [fontsLoaded] = useFonts({
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const renderPet = ({
    item,
  }: {
    item: { projectName: string; petImage: string; id: number };
  }) => (
    <ProjectPet
      navigation={navigation}
      item={item}
      key={item.id}
      name={item.projectName}
      updateCurrentProject={updateCurrentProject}
      resetTimerState={resetTimerState}
    />
  );

  const goToAddProjectsScreen = () => {
    navigation.navigate("New Project");
  };

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.h1}>Your Pets</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={projects}
        renderItem={renderPet}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
        ListFooterComponent={() => (
          <Pressable
            style={styles.view}
            onPress={() => goToAddProjectsScreen()}
          >
            <Image
              style={{ ...styles.main }}
              source={require("../assets/Icons-Buttons/AddProjectBtn.png")}
            />
          </Pressable>
        )}
      />
      <View style={{ height: "12%" }}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    alignSelf: "center",
    color: COLORS.primary,
    fontFamily: "Nunito_900Black",
    fontSize: 40,
    marginBottom: 10,
  },
  main: {
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    height: 200,
    flex: 1,
    flexDirection: "column",
    marginTop: 25,
    width: 200,
  },
  view: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: "center",
  },
});
