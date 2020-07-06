import axios from 'axios';
import { UPDATE_USER_SUCCESS, SEARCH_NEARBY_USERS } from '../../utils/types';

export function setLastLocation(location) {
  return dispatch => {
    axios
      .put('/api/users/setLastLocation', location)
      .then(user => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: user.data });
      })
      .catch(error => {
        console.error('Erro ao obter dados do item: ', error);
      });
  };
}

export function searchUsers(radius) {
  return dispatch => {
    axios
      .get(`/api/users/search/searchNearbyUsers?radius=${radius}`)
      .then(users => {
        dispatch({ type: SEARCH_NEARBY_USERS, payload: users.data });
      })
      .catch(error => {
        console.error('Erro ao obter usuários pŕoximos: ', error);
      });
  };
}
