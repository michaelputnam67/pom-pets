import { Pressable, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/Colors";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";

export default function Button({
  text1,
  text2,
  text3,
  onPress1,
  onPress2,
  onPress3,
  isSelected,
}: {
  text1: string;
  text2: string;
  text3: string;
  onPress1: any;
  onPress2: any;
  onPress3: any;
  isSelected?: boolean;
}) {
  let [fontsLoaded] = useFonts({
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress1}
        style={{
          ...styles.button,
          backgroundColor: isSelected ? COLORS.secondary : "transparent",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: isSelected ? COLORS.white : COLORS.secondary,
          }}
        >
          {text1}
        </Text>
      </Pressable>
      <Pressable
        onPress={onPress2}
        style={{
          ...styles.button,
          backgroundColor: isSelected ? COLORS.secondary : "transparent",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: isSelected ? COLORS.white : COLORS.secondary,
          }}
        >
          {text2}
        </Text>
      </Pressable>
      <Pressable
        onPress={onPress3}
        style={{
          ...styles.button,
          backgroundColor: isSelected ? COLORS.secondary : "transparent",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: isSelected ? COLORS.white : COLORS.secondary,
          }}
        >
          {text3}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: COLORS.secondary,
    height: 50,
    width: "35%",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "75%",
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.accent2,
    marginBottom: 15,
  },
  text: {
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
    // color: COLORS.white,
  },
});
