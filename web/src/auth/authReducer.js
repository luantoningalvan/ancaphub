import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FOLLOW_USER_SUCCESS,
  ADD_ITEM_TO_COLLECTION_SUCCESS,
  SAVE_ITEM_SUCCESS,
  GET_CONTRIBUTIONS_SUCCESS,
  GET_SAVED_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../utils/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  saved: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      window.location.reload();
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case LOGOUT:
      window.location.reload();
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...payload }
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, following: payload }
      };
    case ADD_ITEM_TO_COLLECTION_SUCCESS:
      return {
        ...state,
        user: { ...state.user, personalCollection: payload }
      };
    case SAVE_ITEM_SUCCESS:
      return {
        ...state,
        user: { ...state.user, saved: payload }
      };
    case GET_CONTRIBUTIONS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, contributions: payload }
      };
    case GET_SAVED_SUCCESS:
      return {
        ...state,
        saved: payload.saved
      };
    default:
      return state;
  }
}
