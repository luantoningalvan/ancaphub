import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setErrors, clearErrors } from '../errors/errorActions'

// Login User
export const signIn = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password, level: "admin" });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    dispatch(clearErrors())
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      dispatch(setErrors(errors))
    }

    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

// Carrega usuário
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
}

// Logout / Clear Profile
export const logoutUser = () => dispatch => {
  dispatch({ type: 'LOGOUT' });
};