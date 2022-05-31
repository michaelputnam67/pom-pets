import { Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Button from "../Components/Button";

export default function ProjectTimer() {
  const [count, setCount] = useState(0);

  const onPress = () => {
    setCount(count + 1);
  };

  return (
    <SafeAreaView>
      <Button onPress={() => onPress()} text="Yeehaw"></Button>
      <Text>{count}</Text>
    </SafeAreaView>
  );
}
