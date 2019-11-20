import { SET_DARK_MODE } from '../utils/types';

const initialState = { darkMode: localStorage.getItem('darkMode') == "true" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DARK_MODE:
      localStorage.setItem("darkMode", !state.darkMode)
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
}
