import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_BALANCE,
  FETCH_BALANCE_SUCCESS,
  FETCH_BALANCE_ERROR,
} from "../actionTypes/balances.actionTypes";
import { fetchBalance } from "../api/balances.api";

export function* getBalance(payload) {
  try {
    console.log("payload", payload);
    const balance = yield call(fetchBalance, payload);
    console.log("balance", balance);
    yield put({
      type: FETCH_BALANCE_SUCCESS,
      payload: balance.Data.Balance[0],
    });
  } catch (error) {
    console.log("Error while fetching preference", error);
    yield put({
      type: FETCH_BALANCE_ERROR,
    });
  }
}

export function* accountBalance(params) {
  yield takeEvery(FETCH_BALANCE, getBalance);
}
