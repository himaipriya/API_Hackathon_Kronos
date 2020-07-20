import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_ACCOUNTS_REQUESTED,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_ERROR,
} from "../actionTypes/accounts.actionTypes";
import { fetchAccounts } from "../api/accounts.api";

export function* getAccounts() {
  try {
    const accounts = yield call(fetchAccounts);
    yield put({
      type: FETCH_ACCOUNTS_SUCCESS,
      payload: accounts,
    });
  } catch (error) {
    console.log("Error while fetching the Accounts", error);
    yield put({
      type: FETCH_ACCOUNTS_ERROR,
    });
  }
}

export function* accountsSaga(params) {
  yield takeEvery(FETCH_ACCOUNTS_REQUESTED, getAccounts);
}
