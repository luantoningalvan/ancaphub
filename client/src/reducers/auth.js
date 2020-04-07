import { Types } from "../actions/auth";
import { Types as UserTypes } from "../actions/users";

const INITIAL_STATE = {
  user: [],
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  errorMessage: "",
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case UserTypes.CREATE_USER_SUCCESS:
    case Types.AUTH_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case Types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case Types.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case UserTypes.CREATE_USER_ERROR:
    case Types.AUTH_ERROR:
    case Types.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
