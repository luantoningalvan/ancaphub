import { Types as PostTypes } from "../actions/posts";
import { Types as UserTypes } from "../actions/users";

const INITIAL_STATE = {
  user: {},
  followers: [],
  following: [],
  errorMessage: "",
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case UserTypes.GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserTypes.UPDATE_PROFILE_PICTURE_SUCCESS:
    case UserTypes.UPDATE_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        }
      }  
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
