import types from '../actions/_types'

const initialState = {
  alerts: null,
  snackAlerts: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_ALERTS:
      return {
        ...state,
        alerts: payload
      };
    case types.CLEAR_ALERTS:
      return {
        ...state,
        alerts: null,
        snackAlerts: null
      };
    case types.SHOW_SNACK: {
      return {
        ...state,
        snackAlerts: payload
      };
    }
    default:
      return state;
  }
}
