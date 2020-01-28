import axios from '../services/api';
import setAuthToken from '../utils/setAuthToken';
import { showSnack } from './alertActions';
import { fetchNotifications } from './notificationActions'
import types from './_types'

export const signUp = ({
  name,
  username,
  email,
  password,
  password2
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, username, email, password, password2 });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: types.REGISTER_FAIL,
      payload: err.response.data.message
    });
  }
};

// Carrega usuário
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: types.USER_LOADED,
      payload: res.data
    });
    dispatch(fetchNotifications())
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR
    });
  }
};

// Login User
export const signIn = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password, level: 'user' });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({ 
      type: types.LOGIN_FAIL,
      payload: err.response.data.message
    });
  }
};

// Logout / Clear Profile
export const logoutUser = () => dispatch => {
  dispatch({ type: types.LOGOUT });
};
