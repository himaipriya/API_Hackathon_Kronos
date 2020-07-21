import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_ACCOUNTS_REQUESTED,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_ERROR,
  UPDATE_ACCOUNTLIST,
  UPDATE_ACCOUNTLIST_SUCCESS,
  UPDATE_ACCOUNTLIST_ERROR,
} from "../actionTypes/accounts.actionTypes";
import { fetchAccounts, updateAccountList } from "../api/accounts.api";

export function* getAccounts() {
  try {
    const accounts = yield call(fetchAccounts);
    yield put({
      type: FETCH_ACCOUNTS_SUCCESS,
      payload: accounts.Data.Account,
    });
  } catch (error) {
    console.log("Error while fetching the Accounts", error);
    yield put({
      type: FETCH_ACCOUNTS_ERROR,
    });
  }
}

export function* updateAccountsList(action) {
  try {
    const response = yield call(updateAccountList, action.payload);
    console.log("updateAccountList saga", response);
    yield put({
      type: UPDATE_ACCOUNTLIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log("Error while Updating the accountsList", error);
    yield put({
      type: UPDATE_ACCOUNTLIST_ERROR,
    });
  }
}

export function* accountsSaga(params) {
  yield takeEvery(FETCH_ACCOUNTS_REQUESTED, getAccounts);
  yield takeEvery(UPDATE_ACCOUNTLIST, updateAccountsList);
}
