export const Types = {
  UPDATE_EMAIL_REQUEST: 'settings/update_email_request',
  UPDATE_EMAIL_SUCCESS: 'settings/update_email_success',
  UPDATE_USERNAME_REQUEST: 'settings/update_username_request',
  UPDATE_USERNAME_SUCCESS: 'settings/update_username_success',
  UPDATE_PASSWORD_REQUEST: 'settings/update_password_request',
  UPDATE_PASSWORD_SUCCESS: 'settings/update_password_success',
  UPDATE_GEOLOCATION_REQUEST: 'settings/update_geolocation_request',
  UPDATE_GEOLOCATION_SUCCESS: 'settings/update_geolocation_success',
  SWITCH_COLOR_MODE: 'settings/switch_color_mode',
  SETTINGS_ERROR: 'settings/settings_error',
};

export const updateEmailRequest = ({ email }) => ({
  type: Types.UPDATE_EMAIL_REQUEST,
  payload: { email },
});

export const updateEmailSuccess = ({ email }) => ({
  type: Types.UPDATE_EMAIL_SUCCESS,
  payload: { email },
});

export const updateUsernameRequest = ({ username }) => ({
  type: Types.UPDATE_USERNAME_REQUEST,
  payload: { username },
});

export const updateUsernameSuccess = ({ username }) => ({
  type: Types.UPDATE_USERNAME_SUCCESS,
  payload: { username },
});

export const updatePasswordRequest = ({ currentPassword, newPassword }) => ({
  type: Types.UPDATE_PASSWORD_REQUEST,
  payload: { currentPassword, newPassword },
});

export const updatePasswordSuccess = () => ({
  type: Types.UPDATE_PASSWORD_SUCCESS,
});

export const updateGeoLocationsRequest = (option) => ({
  type: Types.UPDATE_GEOLOCATION_REQUEST,
  payload: option,
});

export const updateGeoLocationsSuccess = (data) => ({
  type: Types.UPDATE_GEOLOCATION_SUCCESS,
  payload: data,
});


export const switchColorMode = (data) => ({
  type: Types.SWITCH_COLOR_MODE,
  payload: data,
});

export const settingsError = ({ errorMessage }) => ({
  type: Types.SETTINGS_ERROR,
  payload: { errorMessage },
});
