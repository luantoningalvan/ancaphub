import types from '../actions/_types'

const INITIAL_STATE = {
  allUsers: [],
  user: null,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LOADING_USERS:
      return {
        ...state,
        loading: true
      }
    case types.SEARCH_NEARBY_USERS:
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: payload,
        loading: false
      };
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case types.GET_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: false
      };
    case types.UPDATE_USER_SUCCESS:
    case types.UPDATE_PROFILE_PICTURE_SUCCESS:  
      return {
        ...state,
        user: { ...state.user, ...payload }
      };
    case types.GET_USER_FOLLOWERS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, followers: payload }
      };
    case types.GET_USER_FOLLOWING_SUCCESS:
      return {
        ...state,
        user: { ...state.user, following: payload }
      };
    case types.GET_USER_LIBRARY_SUCCESS:
      return {
        ...state,
        user: { ...state.user, personalLibrary: payload.items }
      };
    case types.GET_USER_CONTRIBUTIONS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, contributions: payload.items }
      };
    case types.ADD_ITEM_TO_LIBRARY_SUCCESS:
    case types.ADD_BOOKMARK_SUCCESS:
      if (payload.location === 'user-contributions' || payload.location === 'user-library') {
        return {
          ...state,
          user: {
            ...state.user,
            contributions: payload.location === 'user-contributions' ? state.user.contributions.map(item =>
              item._id === payload.item._id ? { ...item, ...payload.item } : item
            ) : state.user.contributions,
            personalLibrary: payload.location === 'user-library' ? state.user.personalLibrary.map(item =>
              item._id === payload.item._id ? { ...item, ...payload.item } : item
            ) : state.user.personalLibrary
          }
        };
      }
    default:
      return state;
  }
}
