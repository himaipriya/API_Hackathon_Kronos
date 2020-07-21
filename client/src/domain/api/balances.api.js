import Api from "../../services/Api";

export const fetchBalance = ({ accountId }) => {
  console.log("accountId", accountId);
  const url = `https://api-hackathon-kronos.herokuapp.com/open-banking/v3.1/aisp/accounts/${accountId}/balances`;
  console.log("url", url);
  return Api.get(url)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
