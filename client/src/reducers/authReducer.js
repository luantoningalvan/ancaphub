import types from '../actions/_types'

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  saved: null
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      window.location.reload();
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case types.REGISTER_FAIL:
    case types.AUTH_ERROR:
    case types.LOGIN_FAIL:
    case types.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case types.USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...payload }
      };
    case types.UNFOLLOW_USER_SUCCESS:
    case types.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, following: payload }
      };
    case types.ADD_ITEM_TO_COLLECTION_SUCCESS:
      return {
        ...state,
        user: { ...state.user, personalCollection: payload }
      };
    case types.SAVE_ITEM_SUCCESS:
      return {
        ...state,
        user: { ...state.user, saved: payload }
      };
    case types.GET_CONTRIBUTIONS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, contributions: payload }
      };
    case types.GET_SAVED_SUCCESS:
      return {
        ...state,
        saved: payload.saved
      };
    default:
      return state;
  }
}
