import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants/Colors";
import {
  useFonts,
  Nunito_500Medium,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";

export default function AboutScreen() {
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>About the Pom</Text>
        <Image
          style={styles.image}
          source={require("../assets/PomTimer.png")}
        />
        <View style={styles.paragraphContainer}>
          <Text style={styles.h2}>How to Use Your Pom Pet</Text>
          <View style={styles.listContainer}>
            <Text style={styles.h3}>Step 1 📝</Text>
            <Text style={styles.paragraph}>Pick a project to work on</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.h3}>Step 2 ⏱</Text>
            <Text style={styles.paragraph}>Set a 25-minute timer</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.h3}>Step 3 🧑‍💻</Text>
            <Text style={styles.paragraph}>Work on the project</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.h3}>Step 4 🍅</Text>
            <Text style={styles.paragraph}>Take a 5 minute break</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.h3}>Step 5 🏕</Text>
            <Text style={styles.paragraph}>
              Every 4 poms, take a longer 15 minute break
            </Text>
          </View>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.h2}>A Brief History</Text>
          <Text style={styles.paragraph}>
            The Pomodoro Technique was developed in the late 1980s by then
            university student Francesco Cirillo. Cirillo was struggling to
            focus on his studies and complete assignments. Feeling overwhelmed,
            he asked himself to commit to just 10 minutes of focused study time.
            Encouraged by the challenge, he found a tomato (pomodoro in Italian)
            shaped kitchen timer, and the Pomodoro technique was born.
          </Text>
          <Image
            style={styles.image}
            source={require("../assets/ToDoComputer.png")}
          />
          <Text style={styles.h2}>Some Guidelines</Text>
          <Text style={styles.paragraph}>
            The 25-minute work sprints are the core of the method, but a
            Pomodoro practice also includes three rules for getting the most out
            of each interval:
          </Text>
          <Text style={styles.h3}>Break down complex projects</Text>
          <Text style={styles.paragraph}>
            If a task requires more than four pomodoros, it needs to be divided
            into smaller, actionable steps. Sticking to this rule will help
            ensure you make clear progress on your projects.
          </Text>
          <Text style={styles.h3}>Small tasks go together</Text>
          <Text style={styles.paragraph}>
            Any tasks that will take less than one Pomodoro should be combined
            with other simple tasks. For example, "write rent check," "set vet
            appointment," and "read Pomodoro article" could go together in one
            session.
          </Text>
          <Text style={styles.h3}>Once a pomodoro is set, it must ring</Text>
          <Text style={styles.paragraph}>
            The pomodoro is an indivisible unit of time and can not be broken,
            especially not to check incoming emails, team chats, or text
            messages. Any ideas, tasks, or requests that come up should be taken
            note of to come back to later.
          </Text>
          <Text style={styles.paragraph}>
            In the event of an unavoidable disruption, take your five-minute
            break and start again.
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("../assets/Pets/PigeonPet.png")}
        />
        <View style={styles.paragraphContainer}>
          <Text style={styles.h2}>So, What's a Pom Pet?</Text>
          <Text style={styles.paragraph}>
            A Pom Pet is a way to help measure your poms and productivity while
            working. By taking the pomodoro concept and "gamifying" it, we are
            creating a way for you to see the results of your work/break time on
            a project visually represented in a pet. Be strict with your work
            schedule, take regular breaks, and you'll see your pet stay healthy.
          </Text>
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
      <View style={{ height: "32%" }}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    alignSelf: "center",
    color: COLORS.primary,
    fontFamily: "Nunito_900Black",
    fontSize: 40,
  },
  h2: {
    alignSelf: "center",
    color: COLORS.secondary,
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 25,
    marginBottom: 20,
    marginTop: 30,
  },
  h3: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 18,
    marginRight: 20,
    marginBottom: 10,
  },
  image: {
    alignSelf: "center",
    height: 280,
    width: 280,
  },
  listContainer: {
    flexDirection: "row",
    width: "75%",
  },
  paragraph: {
    flexWrap: "wrap",
    fontFamily: "Nunito_500Medium",
    fontSize: 16,
    marginBottom: 40,
  },
  paragraphContainer: {
    alignSelf: "center",
    width: "90%",
  },
  view: {
    backgroundColor: COLORS.white,
  },
});
