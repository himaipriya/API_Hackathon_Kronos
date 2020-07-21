import Api from "../../services/Api";

export const submitPayment = (data) => {
  const params = { path: "payments.json", data };
  return Api.post("/stubs/saveData", params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
