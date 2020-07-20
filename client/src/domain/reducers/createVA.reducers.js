import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS
} from "../actionTypes/createVA.actionTypes";

const initialState = {
  fetching: false,
  data: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return {
        ...state,
        fetching: true,
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        fetching: false,
        data: action.payload,
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        fetching: true,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        data: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};
