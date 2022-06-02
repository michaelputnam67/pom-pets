import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";

export default function Button({
  text,
  onPress,
  isTraining
}: {
  text: string;
  onPress: any;
  isTraining?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={{...styles.button, backgroundColor: isTraining ? COLORS.accent : COLORS.secondary }}>
      <Text style={{...styles.text, color: isTraining ? COLORS.primary : COLORS.white}}>{text}</Text>
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
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 28
  },
});
