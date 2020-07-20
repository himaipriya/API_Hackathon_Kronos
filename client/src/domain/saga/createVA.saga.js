import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
} from "../actionTypes/createVA.actionTypes";
import { createAccpunt } from "../api/createVA.api";

export function* createVAccount(action) {
  try {
    const response = yield call(createAccpunt, action.payload);
    console.log("makePayment saga", response);
    yield put({
      type: CREATE_ACCOUNT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log("Error while making payment", error);
    yield put({
      type: CREATE_ACCOUNT_ERROR,
    });
  }
}

export function* accountCreation(params) {
  yield takeEvery(CREATE_ACCOUNT, createVAccount);
}

export function* updateVAccount(action) {
  try {
    const response = yield call(createAccpunt, action.payload);
    console.log("makePayment saga", response);
    yield put({
      type: UPDATE_ACCOUNT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log("Error while making payment", error);
    yield put({
      type: UPDATE_ACCOUNT_ERROR,
    });
  }
}

export function* accountUpdation(params) {
  yield takeEvery(UPDATE_ACCOUNT, updateVAccount);
}