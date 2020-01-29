import types from '../actions/_types'

const initialState = {
  alerts: null,
  snackAlerts: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
        snackAlerts: []
      };
    case types.SHOW_SNACK: {
      return {
        ...state,
        snackAlerts:  [...state.snackAlerts, payload]
      };
    }
    case types.LOGIN_FAIL:
    case types.FETCH_ITEM_FAILURE:
    case types.ADD_ITEM_TO_LIBRARY_FAIL:
    case types.GET_CONTRIBUTIONS_FAIL:
    case types.ADD_BOOKMARK_FAIL:
    case types.GET_BOOKMARKS_FAIL:
    case types.GET_ALL_USERS_FAIL:
    case types.GET_USER_FAIL:
    case types.REGISTER_FAIL:
    case types.UPDATE_USER_FAIL:
    case types.FOLLOW_USER_FAIL:
    case types.UNFOLLOW_USER_FAIL:
    case types.GET_USER_FOLLOWERS_FAIL:
    case types.GET_USER_LIBRARY_FAIL:
    case types.GET_USER_FOLLOWING_FAIL:
    case types.GET_USER_CONTRIBUTIONS_FAIL:
    case types.GET_USER_CONTRIBUTIONS_FAIL:
    case types.ADD_POST_FAILURE:
    case types.SEARCH_TERM_FAILURE:
    case types.UPDATE_LIKES_ERROR:
    case types.DELETE_POST_ERROR:
    case types.GET_NOTIFICATIONS_ERROR:
    case types.READ_NOTIFICATIONS_ERROR:
    case types.UPDATE_USERNAME_FAIL:
    case types.ADD_RATE_FAILURE:
    case types.UPDATE_EMAIL_FAIL:
    case types.UPDATE_PASSWORD_FAIL:
    case types.UPDATE_PROFILE_PICTURE_FAILURE:
    case types.ADD_COMMENT_FAILURE:
      return {
        ...state,
        snackAlerts:  [...state.snackAlerts, { status: 'error', msg:payload}]
      };
    default:
      return state;
  }
}
