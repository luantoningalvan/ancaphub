import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlerts, clearAlerts } from '../alerts/alertActions'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  ADD_ITEM_TO_COLLECTION_SUCCESS,
  ADD_ITEM_TO_COLLECTION_FAIL,
  GET_CONTRIBUTIONS_SUCCESS,
  GET_CONTRIBUTIONS_FAIL
} from '../utils/types'

export const signUp = ({ name, email, password, password2 }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password, password2 })

  try {
    const res = await axios.post('/api/users', body, config)
    dispatch(clearAlerts())
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      dispatch(setAlerts(errors))
    }

    dispatch({
      type: REGISTER_FAIL
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
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

// Login User
export const signIn = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password, level: "user" });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      dispatch(setAlerts(errors))
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const addItemToCollection = item => async dispatch => {
  try {
    const res = await axios.put('/api/users/addItemToCollection', { item })
    dispatch({
      type: ADD_ITEM_TO_COLLECTION_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_COLLECTION_FAIL
    });
  }
}

export function getContributions() {
  return dispatch => {
    axios.get('/api/items/auth/contributions')
      .then(res => {
        dispatch({
          type: GET_CONTRIBUTIONS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_CONTRIBUTIONS_FAIL
        });
      })
  }
}