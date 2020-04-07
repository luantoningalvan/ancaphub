export const Types = {
  GET_USERS_REQUEST: 'users/get_users_request',
  GET_USERS_SUCCESS: 'users/get_users_success',
  CREATE_USER_REQUEST: 'users/create_user_request',
  CREATE_USER_SUCCESS: 'users/create_user_success',
  CREATE_USER_ERROR: 'users/create_user_error',
};

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = ({ items }) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: { items },
});

export const createUserRequest = (data) => ({
  type: Types.CREATE_USER_REQUEST,
  payload: data,
});

export const createUserSuccess = (data) => ({
  type: Types.CREATE_USER_SUCCESS,
  payload: data,
});

export const createUserError = (data) => ({
  type: Types.CREATE_USER_ERROR,
  payload: data,
});