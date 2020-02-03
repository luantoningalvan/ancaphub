import types from '../actions/_types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LOADING_AUTH:
      return {
        ...state,
        loading: true
      }
      case types.LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
        
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          
        };
    case types.LOAD_USER_FAILURE:
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
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
}
