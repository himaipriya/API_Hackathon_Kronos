import {
  FETCH_PREFERENCE,
  FETCH_PREFERENCE_SUCCESS,
  UPDATE_PREFERENCE,
} from "../actionTypes/preferences.actiontypes";

const initialState = {
  fetching: false,
  preferences: {
    virtualAccount: false,
    percent: 0,
    options: {
      cardPayment: false,
      onlinePayment: false,
      transfers: false,
    },
    account: {
      rewardPts: 0,
      rewardAmount: 0,
    },
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREFERENCE:
      return {
        ...state,
        fetching: true,
      };
    case UPDATE_PREFERENCE:
    case FETCH_PREFERENCE_SUCCESS:
      return {
        fetching: false,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
