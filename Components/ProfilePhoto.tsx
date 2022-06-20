import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import Button from "../Components/Button";
import { COLORS } from "../constants/Colors";
import {
  useFonts,
  Nunito_500Medium,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";

const { height, width } = Dimensions.get("window");

export default function ProfilePhoto({
  goBack,
  setPhoto,
  photo,
}: {
  goBack: any;
  setPhoto: any;
  photo: any;
}) {
  let cameraRef = useRef<Camera | any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [type, setType] = useState(CameraType.front);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  if (hasCameraPermission === null) {
    return <Text>Requesting Permission...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePicture = async () => {
    if (!cameraRef) {
      return;
    }
    let options = {
      quality: 0.5,
      base64: true,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    const takeAnother = async () => {
      setPhoto(undefined);
    };
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
        />
        <View style={styles.buttonContainer}>
          <Button
            textStyle={styles.buttonText}
            pressableStyle={styles.button}
            text={"Choose Photo"}
            onPress={goBack}
          />
          <Button
            pressableStyle={styles.button}
            textStyle={styles.buttonText}
            text={"Take Another"}
            onPress={takeAnother}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={goBack}>
            <Image
              style={styles.backButton}
              source={require("../assets/Icons-Buttons/ViewLeftBtn.png")}
            />
          </Pressable>
          <Text style={styles.h3}>back</Text>
        </View>
        <Camera style={styles.camera} ref={cameraRef} type={type}></Camera>
        <View style={styles.buttonContainer}>
          <Button
            pressableStyle={styles.button}
            textStyle={styles.buttonText}
            text={"Take Photo"}
            onPress={takePicture}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: height * 0.5,
    width: width * 0.8,
    marginBottom: height * 0.05,
    marginTop: height * 0.02,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: height * 0.1,
    width: width * 0.7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
  },
  image: {
    height: height * 0.8,
    width: width,
  },
  button: {
    height: height * 0.05,
    margin: 0,
    flex: 1,
  },
  buttonText: {
    fontSize: height * 0.04,
  },
  backButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width * 0.8,
  },
  h3: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
    color: COLORS.grey,
    margin: 8,
    paddingTop: 7,
  },
  backButton: {
    height: height / 25,
    width: width / 25,
    marginTop: height * 0.01,
  },
});
