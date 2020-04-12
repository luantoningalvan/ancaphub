import types from './_types'
import axios from '../services/api';

export function fetchAllInvites() {
  return dispatch => {
    axios
      .get('/api/code')
      .then(invites => {
        dispatch({ type: types.FETCH_ALL_INVITES_SUCCESS, payload: invites.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_ALL_INVITES_FAILURE });
      });
  };
}

export function generateNewInvites(quantity) {
  return dispatch => {
    axios
      .post('/api/code', { quantity })
      .then(invites => {
        dispatch({ type: types.GENERATE_NEW_INVITES_SUCCESS, payload: invites.data });
      })
      .catch(error => {
        dispatch({ type: types.GENERATE_NEW_INVITES_FAILURE });
      });
  };
}
