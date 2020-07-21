import {
  FETCH_TOKEN_REQUESTED,
  FETCH_PS_TOKEN_REQUESTED,
  CLEAR_PS_TOKEN,
} from "../actionTypes/token.actiontypes";

export const getToken = (payload = {}) => ({
  type: FETCH_TOKEN_REQUESTED,
  payload,
});

export const getPSToken = (payload = {}) => ({
  type: FETCH_PS_TOKEN_REQUESTED,
  payload,
});

export const clearPSToken = () => ({
  type: CLEAR_PS_TOKEN,
});
