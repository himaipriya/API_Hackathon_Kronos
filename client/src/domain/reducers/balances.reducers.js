import {
  FETCH_BALANCE,
  FETCH_BALANCE_SUCCESS,
} from "../actionTypes/balances.actionTypes";

const initialState = {
  fetching: false,
  balance: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BALANCE:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_BALANCE_SUCCESS:
      return {
        fetching: false,
        balance: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
