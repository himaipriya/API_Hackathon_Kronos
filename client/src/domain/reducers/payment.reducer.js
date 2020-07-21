import {
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
} from "../actionTypes/payment.actionTypes";

const initialState = {
  fetching: false,
  data: {
    success: false,
  },
  payments: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case MAKE_PAYMENT:
      return {
        ...state,
        data: {
          success: false,
        },
        fetching: true,
      };
    case MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.payload,
      };
    default:
      return state;
  }
};
