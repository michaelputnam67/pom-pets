import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import Button from "../Components/Button";
import apiCalls from "../apiCalls/apiCalls";
import { User, Attributes } from "../interface";

export default function ProfileScreen({ logOut }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiCalls.getUser().then((data) => setUser(data.data));
  }, []);

  return (
    <SafeAreaView>
      {user ? (
        <Text>{user.attributes.email} did this work </Text>
      ) : (
        <Text></Text>
      )}
      <Button text="Sign Out" onPress={logOut}></Button>
    </SafeAreaView>
  );
}
