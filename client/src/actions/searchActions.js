import axios from '../services/api';
import types from './_types'

const searchLoading = () =>{
  return { type: types.SEARCH_LOADING }
}

export function setLastLocation(location) {
  return dispatch => {
    dispatch(searchLoading())
    axios
      .patch('/api/users/setlocation', location)
      .then(user => {
        dispatch({ type: types.UPDATE_USER_SUCCESS, payload: user.data });
      })
      .catch(error => {
        console.error('Erro ao obter dados do item: ', error);
      });
  };
}

export function searchUsers(radius) {
  return dispatch => {
    dispatch(searchLoading())
    axios
      .get(`/api/search/nearby?radius=${radius}`)
      .then(users => {
        dispatch({ type: types.SEARCH_NEARBY_USERS, payload: users.data });
      })
      .catch(error => {
        console.error('Erro ao obter usuários pŕoximos: ', error);
      });
  };
}

export function searchTerm(term) {
  return dispatch => {
    dispatch(searchLoading())
    axios
      .post(`/api/search`, {query: term})
      .then(results => {
        dispatch({ type: types.SEARCH_TERM_SUCCESS, payload: results.data });
      })
      .catch(err => {
        dispatch({ 
          type: types.SEARCH_TERM_FAILURE, 
          payload: err.response.data.message
        });
      });
  };
}

