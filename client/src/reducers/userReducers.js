import types from '../actions/_types'

const INITIAL_STATE = {
  allUsers: [],
  user: null,
  loading: true
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
    case types.GET_USER_COLLECTION_SUCCESS:
      return {
        ...state,
        user: { ...state.user, personalCollection: payload.personalCollection }
      };
    case types.GET_USER_CONTRIBUTIONS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, contributions: payload }
      };
    default:
      return state;
  }
}
