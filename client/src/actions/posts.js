export const Types = {
  CREATE_POST_REQUEST: 'posts/create_post_request',
  CREATE_POST_SUCCESS: 'posts/create_post_success',
  POST_ERROR: 'posts/post_error',
};

export const createPostRequest = (data) => ({
  type: Types.CREATE_POST_REQUEST,
  payload: data
});

export const createPostSuccess = ({ items }) => ({
  type: Types.CREATE_POST_SUCCESS,
  payload: { items },
});

export const usersError = ({ errorMessage }) => ({
  type: Types.POST_ERROR,
  payload: { errorMessage },
});
