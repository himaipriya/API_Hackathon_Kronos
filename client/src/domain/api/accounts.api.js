import Api from "../../services/Api";

export const fetchAccounts = () => {
  return Api.get(
    "https://api-hackathon-kronos.herokuapp.com/open-banking/v3.1/aisp/accounts"
  )
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const updateAccountList = (data) => {
  const params = { path: "accounts.json", data };
  return Api.post("/stubs/saveData", params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
