import { MAKE_PAYMENT } from "../actionTypes/payment.actionTypes";

export const makePayment = (payload = {}) => ({
  type: MAKE_PAYMENT,
  payload,
});
