import Api from "../../services/Api";

export const fetchToken = () => {
  return Api.get("/token")
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
