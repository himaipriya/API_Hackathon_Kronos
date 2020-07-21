import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_REQUESTED,
  UPDATE_ACCOUNTLIST,
} from "../actionTypes/accounts.actionTypes";

const initialState = {
  fetching: false,
  data: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUESTED:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        fetching: false,
        data: action.payload,
      };
    case UPDATE_ACCOUNTLIST:
      return {
        fetching: false,
        data: action.payload,
      };
    default:
      return state;
  }
};
