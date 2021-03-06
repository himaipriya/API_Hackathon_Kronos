import {
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
} from "../actionTypes/createVA.actionTypes";

export const createAccount = (payload = {}) => ({
  type: CREATE_ACCOUNT,
  payload,
});

export const updateVAccount = (payload = {}) => ({
  type: UPDATE_ACCOUNT,
  payload,
});
