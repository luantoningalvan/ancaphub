import { Types as SettingsTypes } from '../actions/settings';

const INITIAL_STATE = {
  colorMode: localStorage.getItem('color_mode') || 'dark',
};

function settings(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case SettingsTypes.SWITCH_COLOR_MODE:
      localStorage.setItem('color_mode', payload);
      return { ...state, colorMode: payload };
    default:
      return state;
  }
}

export default settings;
