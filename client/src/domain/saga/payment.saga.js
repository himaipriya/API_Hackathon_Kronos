import { call, put, takeEvery } from "redux-saga/effects";
import {
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_ERROR,
} from "../actionTypes/payment.actionTypes";
import { submitPayment } from "../api/payment.api";

export function* makePayment(action) {
  try {
    console.log("payload", action.payload);
    const response = yield call(submitPayment, action.payload);
    console.log("makePayment saga", response);
    yield put({
      type: MAKE_PAYMENT_SUCCESS,
      payload: { success: true },
    });
  } catch (error) {
    console.log("Error while making payment", error);
    yield put({
      type: MAKE_PAYMENT_ERROR,
    });
  }
}

export function* payment(params) {
  yield takeEvery(MAKE_PAYMENT, makePayment);
}
