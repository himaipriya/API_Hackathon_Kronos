import Api from "../../services/Api";

export const fetchToken = () => {
  return Api.get(
    "http://api-hackathon-kronos.herokuapp.com/open-banking/v3.1/aisp/init"
  )
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchPSToken = (data) => {
  return Api.post(
    "https://api-hackathon-kronos.herokuapp.com/open-banking/v3.1/pisp/init",
    data
  )
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
