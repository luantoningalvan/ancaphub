import types from "./_types";

export const changeUILanguage = languageCode => {
  return dispatch => {
    dispatch({ type: types.CHANGE_UI_LANGUAGE, payload: languageCode });
  };
};
