import {
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_REQUESTED,
} from "../actionTypes/token.actiontypes";

const initialState = {
  fetching: false,
  userAuthenticated: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_REQUESTED:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_TOKEN_SUCCESS:
      return {
        fetching: false,
        userAuthenticated: true,
      };
    case FETCH_TOKEN_REQUESTED:
      return {
        ...state,
        userAuthenticated: false,
      };
    default:
      return state;
  }
};
