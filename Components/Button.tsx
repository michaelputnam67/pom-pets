import { Dimensions, Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";
const { height, width } = Dimensions.get("window");

type ButtonProps = {
  textStyle?: {};
  pressableStyle?: {};
  text: string;
  onPress: () => void;
  isTraining?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  isTraining,
  pressableStyle,
  textStyle,
}) => {
  let [fontsLoaded] = useFonts({
    Nunito_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: isTraining
            ? pressed
              ? COLORS.accentPressed
              : COLORS.accent
            : pressed
            ? COLORS.secondaryPressed
            : COLORS.secondary,
          ...pressableStyle,
          padding: pressed ? 3 : 0,
        },
        styles.button,
      ]}
    >
      <Text
        style={{
          ...styles.text,
          ...textStyle,
          color: isTraining ? COLORS.primary : COLORS.white,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 45,
    width: width * 0.65,
    height: height * 0.05,
    alignSelf: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 5,
    borderWidth: 0,
  },
  text: {
    fontFamily: "Nunito_900Black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
});
