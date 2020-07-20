import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_REQUESTED,
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
    default:
      return state;
  }
};
