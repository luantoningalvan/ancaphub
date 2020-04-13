export const Types = {
  AUTH_USER_SUCCESS: 'auth/auth_user_success',
  AUTH_USER_REQUEST: 'auth/auth_user_request',
  LOAD_USER_SUCCESS: 'auth/load_user_success',
  LOAD_USER_REQUEST: 'auth/load_user_request',
  LOGOUT_REQUEST: 'auth/logout_request',
  LOGOUT_SUCCESS: 'auth/logout_success',
  AUTH_ERROR: 'auth/auth_error',
};

export const authUserRequest = (data) => ({
  type: Types.AUTH_USER_REQUEST,
  payload: data,
});

export const authUserSuccess = (data) => ({
  type: Types.AUTH_USER_SUCCESS,
  payload: data,
});

export const loadUserRequest = () => ({
  type: Types.LOAD_USER_REQUEST,
});

export const loadUserSuccess = (data) => ({
  type: Types.LOAD_USER_SUCCESS,
  payload: data,
});

export const logoutRequest = () => ({ type: Types.LOGOUT_REQUEST,});
export const logoutSuccess = () => ({ type: Types.LOGOUT_SUCCESS,});

export const authError = ({ errorMessage }) => ({
  type: Types.AUTH_ERROR,
  payload: { errorMessage },
});
