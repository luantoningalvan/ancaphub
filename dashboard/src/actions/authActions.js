import types from './_types'
import axios from '../services/api';
import setAuthToken from '../utils/setAuthToken';

// Carrega usuário
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  dispatch({type: types.LOADING_AUTH})
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type:  types.LOAD_USER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type:  types.LOAD_USER_FAILURE
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

  const body = JSON.stringify({ email, password, level: 'admin' });

  dispatch({type:  types.LOADING_AUTH})

  try {
    const res = await axios.post('/api/auth', body, config);
    
    dispatch({
      type:  types.LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type:  types.LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logoutUser = () => dispatch => {
  dispatch({ type:  types.LOGOUT });
};
