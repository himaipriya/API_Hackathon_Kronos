import {
  FETCH_ACCOUNTS_REQUESTED,
  UPDATE_ACCOUNTLIST,
} from "../actionTypes/accounts.actionTypes";

export const fetchAccounts = (payload = {}) => ({
  type: FETCH_ACCOUNTS_REQUESTED,
  payload,
});

export const updateAccountList = (payload = {}) => ({
  type: UPDATE_ACCOUNTLIST,
  payload,
});
