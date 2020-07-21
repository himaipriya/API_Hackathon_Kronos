import { FETCH_BALANCE } from "../actionTypes/balances.actionTypes";

export const getBalance = (accountId = "") => ({
  type: FETCH_BALANCE,
  accountId,
});
