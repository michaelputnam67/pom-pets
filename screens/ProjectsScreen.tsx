import { Text, FlatList, Pressable, Image, View, SafeAreaView, StyleSheet } from "react-native";
import ProjectPet from "../Components/ProjectPet";
import { COLORS } from "../constants/Colors";
import { Projects } from "../interface";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";

type Item = {
  projectName: string;
  petImage: string;
  id: number
}

type ProjectsScreenProps = {
  removeProject: (id: number) => void;
  updateCurrentProject: (item: Item) => Promise<void>;
  navigation?: any;
  projects: Projects | null;
}

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  removeProject,
  navigation,
  projects,
  updateCurrentProject
}) => {
  let [fontsLoaded] : [boolean, Error | null] = useFonts({
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const renderPet = ({ item }: { item: Item}) => (
    <ProjectPet
      removeProject={removeProject}
      navigation={navigation}
      item={item}
      key={item.id}
      name={item.projectName}
      updateCurrentProject={updateCurrentProject}
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
            style={styles.addNewProject}
            onPress={() => goToAddProjectsScreen()}
          >
            <Image
              style={{ ...styles.image }}
              source={require("../assets/Icons-Buttons/AddProjectBtn.png")}
            />
            <Text style={styles.text}>Add Project</Text>
          </Pressable>
        )}
      />
      <View style={{ height: "12%" }}></View>
    </SafeAreaView>
  );
}

export default ProjectsScreen;

const styles = StyleSheet.create({
  h1: {
    alignSelf: "center",
    color: COLORS.primary,
    fontFamily: "Nunito_900Black",
    fontSize: 40,
    marginBottom: 10,
  },
  view: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
  },
  addNewProject: {
    height: 200,
    width: 200,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    flexDirection: "column",
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#717171",
    shadowOpacity: 0.5,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 5 },
    borderWidth: 0,
  },
  text: {
    color: COLORS.primary,
    alignSelf: "center",
    fontFamily: "Nunito_500Medium",
    fontSize: 18,
  },
});
