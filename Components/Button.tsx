import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

export default function Button({
  text,
  onPress,
}: {
  text: string;
  onPress: any;
}) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 45,
    width: "65%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 28,
  },
});
