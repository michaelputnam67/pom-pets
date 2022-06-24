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
        <Pressable style={styles.goBackPressable} onPress={goBack}>
          <Image
            style={styles.backButton}
            source={require("../assets/Icons-Buttons/ViewLeftBtn.png")}
          />
          <Text style={styles.h3}>back</Text>
        </Pressable>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 0,
  },
  image: {
    height: height * 0.5,
    width: width * 0.8,
    marginBottom: height * 0.05,
    marginTop: height * 0.02,
  },
  button: {
    margin: 0,
    marginBottom: "5%",
  },
  buttonText: {
    fontSize: height * 0.04,
  },
  goBackPressable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width * 0.8,
    marginTop: height * 0.02,
  },
  h3: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
    color: COLORS.grey,
    margin: 8,
  },
  backButton: {
    height: height / 25,
    width: width / 25,
  },
});
