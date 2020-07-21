import { fork } from "redux-saga/effects";
import { accessToken } from "./token.saga";
import { userPreference } from "./preference.saga";
import { payment } from "./payment.saga";
import { accountCreation } from "./createVA.saga";
import { accountsSaga } from "./accounts.saga";

export default function* rootSaga() {
  yield fork(accessToken);
  yield fork(userPreference);
  yield fork(payment);
  yield fork(accountCreation);
  yield fork(accountsSaga);
}
