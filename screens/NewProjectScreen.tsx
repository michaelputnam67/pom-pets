import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Animated,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";

const { width, height } = Dimensions.get("window");
const itemSize = width / 2;
const itemSpacing = (width - itemSize) / 2;

const checkURL = (url: string) => {
  url = url
    .split("")
    .filter((e, i) => i < 19)
    .join("");
  return url === "https://github.com/" ? true : false;
};

const images = [
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

export default function NewProjectScreen({
  createNewProject,
}: {
  createNewProject: any;
}) {
  const [pet, setPet] = useState(images[0]);
  const [projectName, setProjectName] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");

  if (!pet.image) {
    setPet(images[0]);
  }

  const xScroll = useRef(new Animated.Value(0)).current;
  const renderIcon = ({ item, index }: { item: any; index: any }) => {
    const inputRange = [
      (index - 1) * itemSize,
      index * itemSize,
      (index + 1) * itemSize,
    ];

    const opacity = xScroll.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
    });

    const scale = xScroll.interpolate({
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
    <SafeAreaView>
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
            Alert.alert("Please fill out all the forms!");
          } else if (!checkURL(gitHubUrl)) {
            Alert.alert("Please provide a valid url");
          } else {
            createNewProject(pet, projectName, gitHubUrl);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  flatList: {
    flex: 0,
    marginBottom: 50,
  },
  input: {
    height: 50,
    width: "65%",
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 25,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 15,
    margin: 15,
  },
  carouselMessage: {
    marginTop: 30,
    fontSize: 40,
    textWrap: true,
    textAlign: "center",
    alignSelf: "center",
  },
});
