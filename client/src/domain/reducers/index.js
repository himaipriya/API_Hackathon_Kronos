import { combineReducers } from "redux";
import token from "./token.reducer";
import userPreference from "./preferences.reducer";
import makePayment from "./payment.reducer";
import createAccount from "./createVA.reducers";
import accounts from "./accounts.reducers";
import accountBalance from "./balances.reducers";

export default combineReducers({
  token,
  userPreference,
  makePayment,
  createAccount,
  accounts,
  accountBalance,
});
