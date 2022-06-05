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
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import Button from "../Components/Button";

const { height, width } = Dimensions.get("window");

export default function CreateNewUserScreen() {
  let cameraRef = useRef<Camera | any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);
  const [photo, setPhoto] = useState<any>();
  const [type, setType] = useState(CameraType.front);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
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
		const usePhoto = () => {
			shareAsync(photo.uri).then(() => {
				setPhoto(null)
			})
		};
		
		const takeAnother = async () => {};
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
            text={"Use Photo"}
            onPress={usePhoto}
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
          <View style={styles.buttonContainer}>
            <Button text={"Take Photo"} onPress={takePicture} />
          </View>
        </Camera>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: height,
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
});
