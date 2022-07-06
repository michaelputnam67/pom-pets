import { Alert } from "react-native";

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const apiCalls = {
  getUser: (userID: any) =>
    fetch(`https://pom-pets-api.herokuapp.com/api/v1/users/${userID}`).then(
      (res) => res.json().catch((err) => Alert.alert(err))
    ),

  updateUser: (patch: any, userID: any) => {
    return fetch(`https://pom-pets-api.herokuapp.com/api/v1/users/${userID}`, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(patch),
      redirect: "follow",
    })
      .then((res) => res.text())
      .catch((err) => Alert.alert(err));
  },

  createNewUser: (post: any) => {
    return fetch("https://pom-pets-api.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(post),
      redirect: "follow",
    })
      .then((res) => res.json())
      .catch((err) => Alert.alert(err));
  },

  createProject: (post: any) => {
    return fetch("https://pom-pets-api.herokuapp.com/api/v1/projects", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(post),
      redirect: "follow",
    })
      .then((res) => res.json())
      .catch((err) => Alert.alert(err));
  },

  updateProjectStats: (patch: any, projectID: number) => {
    return fetch(
      `https://pom-pets-api.herokuapp.com/api/v1/projects/${projectID}`,
      {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(patch),
        redirect: "follow",
      }
    )
      .then((res) => res.text())
      .catch((err) => Alert.alert(err));
  },

  deleteUser: (userId: number) => {
    return fetch(`https://pom-pets-api.herokuapp.com/api/v1/users/${userId}`, {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((res) => res.text())
      .catch((err) => Alert.alert(err));
  },

  deleteProject: (projectId: number) => {
    return fetch(
      `https://pom-pets-api.herokuapp.com/api/v1/projects/${projectId}`,
      {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((res) => res.text())
      .catch((err) => Alert.alert(err));
  },
};

export default apiCalls;
