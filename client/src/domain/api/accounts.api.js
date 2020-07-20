import Api from "../../services/Api";

export const fetchAccounts = () => {
  return Api.get("/accounts")
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
