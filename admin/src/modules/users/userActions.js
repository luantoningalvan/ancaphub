import axios from 'axios';
import { toastr } from 'react-redux-toastr';
const BASE_URL = 'http://localhost:3000/api/users';

export function fetchAllUsers() {
  return dispatch => {
    axios
      .get(BASE_URL)
      .then(users => {
        dispatch({ type: 'FETCH_USERS_LIST', payload: users.data });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de usuários: ', error);
      });
  };
}

// Remove um usuário pelo seu id
export function deleteUser(id) {
  return dispatch => {
    toastr.error('Erro', 'Essa ação ainda não está disponível.');
    dispatch({ type: 'NOTHING' });
  };
}
