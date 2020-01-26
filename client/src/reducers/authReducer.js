import types from '../actions/_types'

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LOADING_AUTH:
      return {
        ...state,
        loading: true
      }
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
        user: { ...state.user, ...payload },
        loading: false
      };
    case types.UNFOLLOW_USER_SUCCESS:
    case types.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        user: { ...state.user, following: payload },
        loading: false
      };
    case types.GET_CONTRIBUTIONS_SUCCESS:
      return {
        ...state,
        user: { ...state.user, contributions: payload },
        loading: false
      };
    case types.UPDATE_EMAIL_SUCCESS:  
    case types.UPDATE_USERNAME_SUCCESS:  
      return {
        ...state,
        user: { ...state.user, ...payload },
        loading: false
      }
    case types.UPDATE_EMAIL_FAIL:
    case types.UPDATE_USERNAME_FAIL:
    case types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      }  
    default:
      return state;
  }
}
