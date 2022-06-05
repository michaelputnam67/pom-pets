import { View, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../constants/Colors";

function Render3Hp() {
  return (
    <>
      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
      />

      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
      />

      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
      />
    </>
  );
}

function Render2Hp() {
  return (
    <>
      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey-Empty.png")}
      />

      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
      />

      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
      />
    </>
  );
}

function Render1Hp() {
  return (
    <>
      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey-Empty.png")}
      />
      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey-Empty.png")}
      />
      <Image
        style={styles.healthIcon}
        source={require("../assets/Icons-Buttons/HeartIcon-Grey.png")}
      />
    </>
  );
}

export default function HealthIcons({
  health,
}: {
  health: number | undefined;
}) {
  const [hp, setHp] = useState(health);

  useEffect(() => {
    setHp(health);
  });

  return (
    <View style={styles.healthContainer}>
      {hp === 3 && <Render3Hp />}
      {hp === 2 && <Render2Hp />}
      {hp === 1 && <Render1Hp />}
    </View>
  );
}

const styles = StyleSheet.create({
  healthIcon: {
    height: 35,
    width: 35,
    tintColor: COLORS.primary,
  },
  healthContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
