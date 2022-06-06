import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";

export default function Button({
  text,
  onPress,
  isTraining,
}: {
  text: string;
  onPress: any;
  isTraining?: boolean;
}) {
  let [fontsLoaded] = useFonts({
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: isTraining ? COLORS.accent : COLORS.secondary,
      }}
    >
      <Text
        style={{
          ...styles.text,
          color: isTraining ? COLORS.primary : COLORS.white,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 45,
    width: "65%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    margin: 10,
    shadowColor: "#717171",
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: "#0000",
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 5 },
    borderWidth: 0,
  },
  text: {
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 28,
  },
});
