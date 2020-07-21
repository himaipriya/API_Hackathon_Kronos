import { FETCH_TOKEN_REQUESTED } from "../actionTypes/token.actiontypes";

export const getToken = (payload = {}) => ({
  type: FETCH_TOKEN_REQUESTED,
  payload,
});
