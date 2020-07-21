import {
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_REQUESTED,
  FETCH_PS_TOKEN_REQUESTED,
  FETCH_PS_TOKEN_SUCCESS,
  CLEAR_PS_TOKEN,
} from "../actionTypes/token.actiontypes";

const initialState = {
  fetching: false,
  userAuthenticated: false,
  acctoken: {},
  pstoken: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PS_TOKEN_REQUESTED:
    case FETCH_TOKEN_REQUESTED:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        fetching: false,
        userAuthenticated: true,
        acctoken: action.payload,
      };
    case FETCH_PS_TOKEN_SUCCESS:
      return {
        ...state,
        fetching: false,
        userAuthenticated: true,
        pstoken: action.payload,
      };
    case FETCH_TOKEN_REQUESTED:
      return {
        ...state,
        userAuthenticated: false,
      };
    case CLEAR_PS_TOKEN: {
      return {
        ...state,
        fetching: false,
        pstoken: {},
      };
    }
    default:
      return state;
  }
};
