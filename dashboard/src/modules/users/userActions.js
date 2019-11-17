import axios from '../../services/api';
import { toastr } from 'react-redux-toastr';

export function fetchAllUsers() {
  return dispatch => {
    axios
      .get('/api/users')
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
