import types from './_types'
import axios from '../services/api';

export function fetchAllUsers() {
  return dispatch => {
    axios
      .get('/api/users')
      .then(users => {
        dispatch({ type: types.FETCH_ALL_USERS_SUCCESS, payload: users.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_ALL_USERS_FAILURE });
      });
  };
}

export function fetchUser(userId) {
  return dispatch => {
    axios
      .get(`/api/users/${userId}`)
      .then(user => {
        dispatch({ type: types.FETCH_USER_SUCCESS, payload: user.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_USER_FAILURE });
      });
  };
}
