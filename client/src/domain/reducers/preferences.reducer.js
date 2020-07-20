import {
  FETCH_PREFERENCE,
  FETCH_PREFERENCE_SUCCESS,
} from "../actionTypes/preferences.actiontypes";

const initialState = {
  fetching: false,
  preferences: {
    virtualAccount: false,
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREFERENCE:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_PREFERENCE_SUCCESS:
      return {
        fetching: false,
        preferences: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
