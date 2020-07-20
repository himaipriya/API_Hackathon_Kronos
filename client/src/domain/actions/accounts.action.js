import { FETCH_ACCOUNTS_REQUESTED } from "../actionTypes/accounts.actionTypes";

export const fetchAccounts = (payload = {}) => ({
  type: FETCH_ACCOUNTS_REQUESTED,
  payload,
});
