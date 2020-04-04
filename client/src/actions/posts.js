export const Types = {
  CREATE_POST_REQUEST: 'posts/create_post_request',
  CREATE_POST_SUCCESS: 'posts/create_post_success',
  GET_POSTS_REQUEST: 'posts/get_posts_request',
  GET_POSTS_SUCCESS: 'posts/get_posts_success',
  GET_USER_POSTS_REQUEST: 'posts/get_user_posts_request',
  GET_USER_POSTS_SUCCESS: 'posts/get_user_posts_success',
  GET_USER_POSTS_ERROR: 'posts/get_user_posts_error',
  POST_ERROR: 'posts/post_error',
};

export const createPostRequest = (data) => ({
  type: Types.CREATE_POST_REQUEST,
  payload: data,
});

export const createPostSuccess = (data) => ({
  type: Types.CREATE_POST_SUCCESS,
  payload: data,
});

export const getPostsRequest = (data) => ({
  type: Types.GET_POSTS_REQUEST,
  payload: data,
});

export const getPostsSuccess = ({ items }) => ({
  type: Types.GET_POSTS_SUCCESS,
  payload: { items },
});

export const getUserPostsRequest = ({ userId }) => ({
  type: Types.GET_USER_POSTS_REQUEST,
  payload: userId,
});

export const getUserPostsSuccess = ({ userFeedItems }) => ({
  type: Types.GET_USER_POSTS_SUCCESS,
  payload: { userFeedItems },
});

export const getPostsError = ({ errorMessage }) => ({
  type: Types.POST_ERROR,
  payload: { errorMessage },
});

export const getUserPostsError = ({ errorMessage }) => ({
  type: Types.GET_USER_POSTS_ERROR,
  payload: { errorMessage },
});

export const usersError = ({ errorMessage }) => ({
  type: Types.POST_ERROR,
  payload: { errorMessage },
});
