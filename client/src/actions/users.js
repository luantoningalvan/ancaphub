export const Types = {
  GET_USERS_REQUEST: 'users/get_users_request',
  GET_USERS_SUCCESS: 'users/get_users_success',
  GET_SINGLE_USER_REQUEST: 'users/get_single_user_request',
  GET_SINGLE_USER_SUCCESS: 'users/get_single_user_success',
  CREATE_USER_REQUEST: 'users/create_user_request',
  CREATE_USER_SUCCESS: 'users/create_user_success',
  GET_USER_FOLLOWERS_REQUEST: 'users/get_user_followers_request',
  GET_USER_FOLLOWERS_SUCCESS: 'users/get_user_followers_success',
  GET_USER_FOLLOWING_REQUEST: 'users/get_user_following_request',
  GET_USER_FOLLOWING_SUCCESS: 'users/get_user_following_success',
  UPDATE_PROFILE_PICTURE_REQUEST: 'users/update_profile_picture_request',
  UPDATE_PROFILE_PICTURE_SUCCESS: 'users/update_profile_picture_success',
  UPDATE_PROFILE_INFO_REQUEST: 'users/update_profile_info_request',
  UPDATE_PROFILE_INFO_SUCCESS: 'users/update_profile_info_success',
  CREATE_USER_ERROR: 'users/create_user_error',
  GET_USERS_COUNT: 'users/get_users_count',
};


export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = ({ items }) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: { items },
});

export const getSingleUserRequest = (id) => ({
  type: Types.GET_SINGLE_USER_REQUEST,
  payload: id,
});

export const getSingleUserSuccess = (data) => ({
  type: Types.GET_SINGLE_USER_SUCCESS,
  payload: data,
});

export const getUserFollowersRequest = (id) => ({
  type: Types.GET_USER_FOLLOWERS_REQUEST,
  payload: id,
});

export const getUserFollowersSuccess = (data) => ({
  type: Types.GET_USER_FOLLOWERS_SUCCESS,
  payload: data,
});

export const getUserFollowingRequest = (id) => ({
  type: Types.GET_USER_FOLLOWING_REQUEST,
  payload: id,
});

export const getUserFollowingSuccess = (data) => ({
  type: Types.GET_USER_FOLLOWING_SUCCESS,
  payload: data,
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

export const getUsersCount = (data) => ({
  type: Types.GET_USERS_COUNT,
  payload: data,
});


export const updateProfilePictureRequest = (data) => ({
  type: Types.UPDATE_PROFILE_PICTURE_REQUEST,
  payload: data,
});

export const updateProfilePictureSuccess = (data) => ({
  type: Types.UPDATE_PROFILE_PICTURE_SUCCESS,
  payload: data,
});


export const updateProfileInfoRequest = (data) => ({
  type: Types.UPDATE_PROFILE_INFO_REQUEST,
  payload: data,
});

export const updateProfileInfoSuccess = (data) => ({
  type: Types.UPDATE_PROFILE_INFO_SUCCESS,
  payload: data,
});
