export const Types = {
  LOAD_COMMENTS_REQUEST: 'comments/load_comments_request',
  LOAD_COMMENTS_SUCCESS: 'comments/load_comments_success',
  ADD_COMMENT_REQUEST: 'comments/add_comment_request',
  ADD_COMMENT_SUCCESS: 'comments/add_comment_success',
  DELETE_COMMENT_REQUEST: 'comments/delete_comment_request',
  DELETE_COMMENT_SUCCESS: 'comments/delete_comment_success',
  LIKE_COMMENT_REQUEST: 'comments/like_comment_request',
  LIKE_COMMENT_SUCCESS: 'comments/like_comment_success',
};

export const loadCommentsRequest = (post) => ({
  type: Types.LOAD_COMMENTS_REQUEST,
  payload: post,
});

export const loadCommentsSuccess = (data) => ({
  type: Types.LOAD_COMMENTS_SUCCESS,
  payload: data,
});

export const addCommentRequest = (comment, postId) => ({
  type: Types.ADD_COMMENT_REQUEST,
  payload: { comment, postId },
});

export const addCommentSuccess = (data) => ({
  type: Types.ADD_COMMENT_SUCCESS,
  payload: data,
});

export const deleteCommentRequest = (postId, commentId) => ({
  type: Types.DELETE_COMMENT_REQUEST,
  payload: { postId, commentId },
});

export const deleteCommentSuccess = (commentId) => ({
  type: Types.DELETE_COMMENT_SUCCESS,
  payload: commentId,
});

export const likeCommentRequest = (commentId) => ({
  type: Types.LIKE_COMMENT_REQUEST,
  payload: commentId,
});

export const likeCommentSuccess = (commentId) => ({
  type: Types.LIKE_COMMENT_SUCCESS,
  payload: commentId,
});
