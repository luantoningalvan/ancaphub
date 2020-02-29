import types from "../actions/_types";

const INITIAL_STATE = {
  currentLanguage: "pt"
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CHANGE_UI_LANGUAGE:
      return { ...state, currentLanguage: payload };
    default:
      return state;
  }
}
