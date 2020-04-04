import { Types as PostTypes } from '../actions/posts';

const INITIAL_STATE = {
  userFeedItems: [],
  errorMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PostTypes.GET_USER_POSTS_SUCCESS:
      return { ...state, userFeedItems: [payload.userFeedItems][0] };
    case PostTypes.GET_USER_POSTS_ERROR:
      return { ...state, errorMessage: payload.errorMessage };
    default:
      return state;
  }
};
