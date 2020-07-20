import Api from "../../services/Api";

export const createAccpunt = (params) => {
  const data = { path: "user/preference.json", data: { ...params } };
  return Api.post("/stubs/saveData", data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
