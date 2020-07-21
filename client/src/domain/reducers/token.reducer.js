import {
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_REQUESTED,
} from "../actionTypes/token.actiontypes";

const initialState = {
  fetching: false,
  userAuthenticated: false,
  token: {},
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
        token: action.payload,
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
