import { Alert } from "react-native";

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const apiCalls = {
  getUser: () =>
    fetch("https://pom-pets-api.herokuapp.com/api/v1/users/2")
      .then((res) => res.json())
      .catch((err) => Alert.alert(err)),

  updateUser: (patch: any) => {
    fetch("https://pom-pets-api.herokuapp.com/api/v1/users/2", {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(patch),
      redirect: "follow",
    })
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  },
};

export default apiCalls;
