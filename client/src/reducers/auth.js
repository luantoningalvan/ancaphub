import { Types } from '../actions/auth';

const INITIAL_STATE = {
  user: [],
  isAuthenticated: null,
  token: localStorage.getItem('token'),
  errorMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.AUTH_USER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
      };
    case Types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case Types.LOGOUT:
      return {
        ...state, user: null, isAuthenticated: false, token: null,
      };
    case Types.AUTH_ERROR:
      return {
        ...state,
        errorMessage: payload.errorMessage,
        token: null,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};
