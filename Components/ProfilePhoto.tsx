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
import * as ImagePicker from 'expo-image-picker';
import { shareAsync } from "expo-sharing";
import { getStorage, ref, uploadBytes, getDownloadURL, } from 'firebase/storage';
import uuid from 'uuid';
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCEnXq52ByAhEgHbP96fLCf-zHxK9hKgCE",
  authDomain: "pom-pets.firebaseapp.com",
  databaseURL: "https://pom-pets-default-rtdb.firebaseio.com",
  projectId: "pom-pets",
  storageBucket: "pom-pets.appspot.com",
  messagingSenderId: "10853452286",
  appId: "1:10853452286:web:a054f188f2caea662c98af",
  measurementId: "G-RFMCZ0DXYS"
};


	const app =	initializeApp(firebaseConfig);


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
		const usePhoto = async (name: string) => {
			const response = await fetch(photo.uri);
			const blob = await response.blob();
			const fileRef = ref(getStorage(), `images/profile-photo/${name}`)
			const result = await uploadBytes(fileRef, blob)
			console.log(result)

			// const blob : any = await new Promise((resolve, reject) => {
			// 	const xhr = new XMLHttpRequest();
			// 	xhr.onload = function () {
			// 		resolve(xhr.response);
			// 	};
			// 	xhr.onerror = function (e) {
			// 		console.log(e);
			// 		reject(new TypeError("Network request failed"));
			// 	};
			// 	xhr.responseType = "blob";
			// 	xhr.open("GET", photo.uri, true);
			// 	xhr.send(null);
			// });

			// const fileRef = ref(getStorage(), uuid.v4());
			// const result = await uploadBytes(fileRef, blob)

			// blob.close()
			// return await getDownloadURL(fileRef)
			
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
            onPress={() => usePhoto('test')}
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
