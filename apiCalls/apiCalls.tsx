import { Alert } from "react-native";

const apiCalls = {
  getUser: () =>
    fetch("https://pom-pets-api.herokuapp.com/api/v1/users/2")
      .then((res) => res.json())
      .catch((err) => Alert.alert(err)),
};

export default apiCalls;
