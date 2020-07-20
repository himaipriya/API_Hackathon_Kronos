import Api from "../../services/Api";

export const fetchPreference = () => {
  return Api.get("/user/preference")
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
