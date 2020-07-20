import Api from "../../services/Api";

export const createAccpunt = (data) => {
  const params = { path: "user/preference.json", data };
  return Api.post("/stubs/saveData", params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
