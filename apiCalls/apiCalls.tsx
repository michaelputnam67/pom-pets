import { Alert } from "react-native";

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const apiCalls = {
  getUser: () =>
    fetch("https://pom-pets-api.herokuapp.com/api/v1/users/1")
      .then((res) => res.json())
      .catch((err) => Alert.alert(err)),

  updateUser: (patch: any) => {
    fetch("https://pom-pets-api.herokuapp.com/api/v1/users/1", {
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

  updateProjectStats: (patch: any, projectID: number) => {
    return fetch(`https://pom-pets-api.herokuapp.com/api/v1/projects/${projectID}`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(patch),
      redirect: "follow",
    })
      .then((res) => res.text())
      .catch((err) => Alert.alert(err));
  }
};

export default apiCalls;
