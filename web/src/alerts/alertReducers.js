import {
  SET_ALERTS,
  CLEAR_ALERTS,
  SHOW_SNACK
} from '../utils/types'


const initialState = {
  alerts: null,
  snackAlerts: null
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ALERTS:
      return {
        ...state,
        alerts: payload
      };
    case CLEAR_ALERTS:
      return {
        ...state,
        alerts: null,
        snackAlerts: null
      };
    case SHOW_SNACK: {
      return {
        ...state,
        snackAlerts: payload
      };
    }
    default:
      return state;
  }
}
