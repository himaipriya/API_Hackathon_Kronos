import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_TOKEN_REQUESTED,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_ERROR,
  FETCH_PS_TOKEN_REQUESTED,
  FETCH_PS_TOKEN_SUCCESS,
  FETCH_PS_TOKEN_ERROR,
} from "../actionTypes/token.actiontypes";
import { fetchToken, fetchPSToken } from "../api/token.api";

export function* getToken() {
  try {
    const token = yield call(fetchToken);
    yield put({
      type: FETCH_TOKEN_SUCCESS,
      payload: token,
    });
  } catch (error) {
    console.log("Error while frecthing token", error);
    yield put({
      type: FETCH_TOKEN_ERROR,
    });
  }
}

export function* getPSToken(action) {
  try {
    const token = yield call(fetchPSToken, action.payload);
    yield put({
      type: FETCH_PS_TOKEN_SUCCESS,
      payload: token,
    });
  } catch (error) {
    console.log("Error while frecthing PStoken", error);
    yield put({
      type: FETCH_PS_TOKEN_ERROR,
    });
  }
}

export function* accessToken(params) {
  yield takeEvery(FETCH_TOKEN_REQUESTED, getToken);
  yield takeEvery(FETCH_PS_TOKEN_REQUESTED, getPSToken);
}
