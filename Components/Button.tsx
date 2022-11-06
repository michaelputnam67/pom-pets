import { Dimensions, Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/Colors";
import { useFonts, Nunito_900Black } from "@expo-google-fonts/nunito";
const { height, width } = Dimensions.get("window");

type ButtonProps = {
  textStyle?: {};
  pressableStyle?: {};
  text: string;
  onPress: any;
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
      style={{
        ...styles.button,
        ...pressableStyle,
        backgroundColor: isTraining ? COLORS.accent : COLORS.secondary,
      }}
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
    fontSize: 24,
  },
});
