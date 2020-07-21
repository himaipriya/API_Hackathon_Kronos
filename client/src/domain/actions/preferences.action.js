import { FETCH_PREFERENCE } from "../actionTypes/preferences.actiontypes";

export const getPreference = (payload = {}) => ({
  type: FETCH_PREFERENCE,
  payload,
});
