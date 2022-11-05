import React, { useRef, useState } from "react";
import { Alert, Dimensions, Animated, SafeAreaView, Text, StyleSheet, TextInput } from "react-native";
import Button from "../Components/Button";
import { Pet } from "../interface";
import { COLORS } from "../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Image = {
  url: any;
  key: number;
  image: string;
  name: string;
}
type Images = Image[]

type NewProjectScreenProps = {
  createNewProject: (pet: Pet, projectName: string, gitHubUrl: string) => Promise<any>;
  navigation: any;
  loadNewProject: (res: any) => Promise<void>;
  resetTimerState: () => Promise<void>
}

const { width, height } : {width: number, height: number} = Dimensions.get("window");
const itemSize : number = width / 2;
const itemSpacing : number = (width - itemSize) / 2;

const checkURL = (url: string) => {
  url = url
    .split("")
    .filter((e, i) => i < 19)
    .join("");
  return url === "https://github.com/" ? true : false;
};

const images : Images = [
  {
    url: require("../assets/Pets/CandlePet.png"),
    key: 1,
    image: "../assets/Pets/CandlePet.png",
    name: "candlePet",
  },
  {
    url: require("../assets/Pets/PigeonPet.png"),
    key: 2,
    image: "../assets/Pets/PigeonPet.png",
    name: "pigeon-image",
  },
  {
    url: require("../assets/Pets/TomatoPet.png"),
    key: 3,
    image: "../assets/Pets/TomatoPet.png",
    name: "tomato-image",
  },
];

const NewProjectScreen : React.FC<NewProjectScreenProps> = ({
  createNewProject,
  navigation,
  loadNewProject,
  resetTimerState
}) => {
  const [pet, setPet] = useState<Pet>(images[0]);
  const [projectName, setProjectName] = useState<string>("");
  const [gitHubUrl, setGitHubUrl] = useState<string>("");

  if (!pet.image) {
    setPet(images[0]);
  }

  const clearInputs: () => void = () => {
    setProjectName("");
    setGitHubUrl("");
    setPet(images[0]);
  };

  const xScroll: Animated.Value = useRef(new Animated.Value(0)).current;
  const renderIcon = ({ item, index }: { item: Image; index: number }) => {
    const inputRange: number[] = [
      (index - 1) * itemSize,
      index * itemSize,
      (index + 1) * itemSize,
    ];

    const opacity: Animated.AnimatedInterpolation = xScroll.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
    });

    const scale: Animated.AnimatedInterpolation = xScroll.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });

    return (
      <Animated.View>
        <Animated.Image
          style={{
            ...styles.image,
            opacity,
            transform: [
              {
                scale,
              },
            ],
          }}
          source={item.url}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.h1}>New Project</Text>
        <Animated.View>
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xScroll } } }],
              { useNativeDriver: true }
            )}
            bounces={false}
            horizontal={true}
            data={images}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / itemSize
              );
              setPet(images[index]);
            }}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={itemSize}
            contentContainerStyle={{
              paddingHorizontal: itemSpacing,
            }}
            style={styles.flatList}
            renderItem={renderIcon}
          />
        </Animated.View>
        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={setProjectName}
          value={projectName}
          placeholder={"Project Name"}
        />
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          onChangeText={setGitHubUrl}
          value={`https://github.com/${gitHubUrl.slice(19)}`}
        />
        <Button
          text="Submit"
          onPress={() => {
            if (!pet.image || !projectName || !gitHubUrl) {
              Alert.alert("Please fill in all inputs!");
            } else if (!checkURL(gitHubUrl)) {
              Alert.alert("Please provide a valid url");
            } else {
              resetTimerState()
              createNewProject(pet, projectName, gitHubUrl).then((res:any) => {
               return loadNewProject(res).then(() => {
                  clearInputs();
                  navigation.navigate("Pet");
                });
              });
            }
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default NewProjectScreen;

const styles = StyleSheet.create({
  carouselMessage: {
    alignSelf: "center",
    fontSize: 40,
    textAlign: "center",
    textWrap: true,
    marginTop: 30,
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  flatList: {
    flex: 0,
    marginBottom: 50,
  },
  h1: {
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    color: COLORS.primary,
    fontSize: 40,
  },
  image: {
    height: height / 4,
    width: width / 2,
  },
  input: {
    alignSelf: "center",
    borderColor: COLORS.grey,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    textAlign: "center",
    fontSize: 15,
    margin: 15,
    width: "65%",
  },
});
