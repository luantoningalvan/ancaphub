import { Types as PostTypes } from "../actions/posts";
import { Types as UserTypes } from "../actions/users";

const INITIAL_STATE = {
  user: {},
  followers: [],
  following: [],
  posts: [],
  errorMessage: "",
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PostTypes.GET_USER_POSTS_REQUEST:
      return {
        ...state,
        loadingPosts: true,
      };
    case PostTypes.GET_USER_POSTS_SUCCESS:
      return { ...state, posts: [payload.posts][0], loadingPosts: false };
    case PostTypes.GET_USER_POSTS_ERROR:
      return { ...state, errorMessage: payload.errorMessage };
    case UserTypes.GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserTypes.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case UserTypes.GET_USER_FOLLOWERS_REQUEST:
      return { ...state, loadingFollowers: true };
    case UserTypes.GET_USER_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: payload,
        loadingFollowers: false,
      };
    case UserTypes.GET_USER_FOLLOWING_REQUEST:
      return { ...state, loadingFollowing: true };
    case UserTypes.GET_USER_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: payload,
        loadingFollowing: false,
      };
    default:
      return state;
  }
};
