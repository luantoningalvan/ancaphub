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

// Remove um usuário pelo seu id
export function deleteUser(id) {
  return dispatch => {
    dispatch({ type: 'NOTHING' });
  };
}
