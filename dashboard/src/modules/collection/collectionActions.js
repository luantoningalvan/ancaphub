import axios from '../../services/api';
import { toastr } from 'react-redux-toastr';

// Obtém a lista de todos os itens
export function fetchAllItems(
  page = 1,
  { type, category },
  status = 'published'
) {
  return dispatch => {
    axios
      .get(
        `/api/items?page=${page}&&pageSize=20&&status=${status}${category &&
          `&&category=${category}`}${type && `&&type=${type}`}`
      )
      .then(items => {
        dispatch({ type: 'FETCH_ALL_ITEMS', payload: items.data });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de itens: ', error);
      });
  };
}

// Obtém os dados de um item
export function fetchItem(id) {
  return dispatch => {
    dispatch({ type: "LOADING_ITEM"})
    axios
      .get(`/api/items/${id}`)
      .then(item => {
        dispatch({ type: 'FETCH_ITEM', payload: item.data });
      })
      .catch(error => {
        console.error('Erro ao obter dados do item: ', error);
      });
  };
}

// Prepara o estado da aplicação para gerar um formulário de adição de item
export function clearItem() {
  return { type: 'CLEAR_ITEM' };
}

// Cria um novo item
export function createItem(data, type) {
  return dispatch => {
    axios
      .post('/api/items', { ...data, type: type })
      .then(function(data) {
        toastr.success('Sucesso', 'Item Adicionado com Sucesso.');
        dispatch({ type: 'ITEM_ADDED', payload: true });
      })
      .catch(function(error) {
        console.error('Erro ao adicionar item: ', error);
      });
  };
}

// Edita um item através do seu id
export function updateItem(data, type) {
  console.log(data);
  return dispatch => {
    axios
      .put(`/api/items/${data._id}`, { ...data, type: type })
      .then(function(item) {
        toastr.success('Sucesso', 'Item Atualizado com Sucesso.');
        dispatch({ type: 'ITEM_UPDATED', payload: true });
        dispatch(fetchItem(item.data._id));
      })
      .catch(function(error) {
        console.error('Erro ao atualizar item: ', error);
      });
  };
}

// Remove um item pelo seu id
export function deleteItem(id) {
  return dispatch => {
    axios
      .delete(`/api/items/${id}`)
      .then(function(docRef) {
        toastr.success('Sucesso', 'Item Removido com Sucesso.');
        dispatch({ type: 'ITEM_DELETED', payload: id });
      })
      .catch(function(error) {
        console.error('Erro ao deletar item: ', error);
      });
  };
}

// Remove um item pelo seu id
export function approveItem(id) {
  return dispatch => {
    axios
      .put(`/api/items/${id}/approve`)
      .then(function(res) {
        toastr.success('Sucesso', 'Item Aprovado com Sucesso.');
        dispatch({ type: 'ITEM_APPROVED', payload: res.data._id });
      })
      .catch(function(error) {
        console.error('Erro ao aprovar item: ', error);
      });
  };
}
