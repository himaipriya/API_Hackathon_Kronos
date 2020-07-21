import Api from "../../services/Api";

export const submitPayment = (data) => {
  // const params = { path: "payments.json", data };
  return Api.post(
    "https://api-hackathon-kronos.herokuapp.com/open-banking/v3.1/pisp/domestic-payments",
    data
  )
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
