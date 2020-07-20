import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_PREFERENCE,
  FETCH_PREFERENCE_SUCCESS,
  FETCH_PREFERENCE_ERROR,
} from "../actionTypes/preferences.actiontypes";
import { fetchPreference } from "../api/preferences.api";

export function* getPreference() {
  try {
    const preference = yield call(fetchPreference);
    console.log("preference", preference);
    yield put({
      type: FETCH_PREFERENCE_SUCCESS,
      payload: preference,
    });
  } catch (error) {
    console.log("Error while fetching preference", error);
    yield put({
      type: FETCH_PREFERENCE_ERROR,
    });
  }
}

export function* userPreference(params) {
  yield takeEvery(FETCH_PREFERENCE, getPreference);
}
