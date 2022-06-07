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
        <Camera style={styles.camera} ref={cameraRef} type={type}>
          <Pressable onPress={goBack}>
            <Image
              style={styles.backButton}
              source={require("../assets/Icons-Buttons/ViewLeftBtn.png")}
            />
          </Pressable>
        </Camera>
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
    height: height * 0.9,
    width: width,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: height * 0.1,
    wdith: width,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
  },
  image: {
    height: height * 0.9,
    width: width,
  },
  button: {
    height: height * 0.1,
    width: width / 2,
    margin: 0,
    flex: 1,
  },
  buttonText: {
    fontSize: height * 0.04,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
    height: height / 10,
    width: width / 10,
  },
});
