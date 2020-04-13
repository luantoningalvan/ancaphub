export const Types = {
  UNFOLLOW_USER_REQUEST: 'users/unfollow_user_request',
  UNFOLLOW_USER_SUCCESS: 'users/unfollow_user_success',
  FOLLOW_USER_REQUEST: 'users/follow_user_request',
  FOLLOW_USER_SUCCESS: 'users/follow_user_success',
  GET_USER_RELATIONSHIPS: 'users/get_users_relationships',
};

export const getUsersRelationsips = (data) => ({
  type: Types.GET_USER_RELATIONSHIPS,
  payload: data,
});

export const followUserRequest = (user) => ({
  type: Types.FOLLOW_USER_REQUEST,
  payload: user,
});

export const followUserSuccess = (data) => ({
  type: Types.FOLLOW_USER_SUCCESS,
  payload: data,
});

export const unfollowUserRequest = (user) => ({
  type: Types.UNFOLLOW_USER_REQUEST,
  payload: user,
});

export const unfollowUserSuccess = (data) => ({
  type: Types.UNFOLLOW_USER_SUCCESS,
  payload: data,
});