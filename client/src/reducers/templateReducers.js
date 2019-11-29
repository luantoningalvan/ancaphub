import types from '../actions/_types'

const INITIAL_STATE = { darkMode: localStorage.getItem('darkMode') == "true" };

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_DARK_MODE:
      localStorage.setItem("darkMode", !state.darkMode)
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
}
