import { Alert } from "react-native";

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const apiCalls = {
  getUser: (userID: any) =>
    fetch(`https://pom-pets-api.herokuapp.com/api/v1/users/${userID}`)
      .then((res) => res.json())
      .catch((err) => Alert.alert(err)),

  updateUser: (patch: any, userID: any) => {
    fetch(`https://pom-pets-api.herokuapp.com/api/v1/users/${userID}`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(patch),
      redirect: "follow",
    })
      .then((res) => res.text())
      .catch((err) => Alert.alert(err));
  },

  createProject: (post: any) => {
    fetch("https://pom-pets-api.herokuapp.com/api/v1/projects", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(post),
      redirect: "follow",
    })
      .then((res) => res.json())
      .catch((err) => Alert.alert(err));
  },
};

export default apiCalls;
