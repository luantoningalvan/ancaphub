import axios from '../services/api';
import setAuthToken from '../utils/setAuthToken';
import { setAlerts, clearAlerts } from './alertActions';
import { fetchNotifications } from './notificationActions'
import types from './_types'

export const signUp = ({
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

  const body = JSON.stringify({ username, email, password, password2 });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch(clearAlerts());
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlerts(errors));
    }

    dispatch({
      type: types.REGISTER_FAIL
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
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlerts(errors));
    }

    dispatch({
      type: types.LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logoutUser = () => dispatch => {
  dispatch({ type: types.LOGOUT });
};
