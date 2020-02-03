import types from './_types'
import axios from '../services/api';

// Obtém a lista de todos os itens
export function fetchAllItems(
  page = 1,
  { type, category },
  status = 'published'
) {
  return dispatch => {
    axios
      .get(
        `/api/library?page=${page}&&pageSize=20&&status=${status}${category &&
          `&&category=${category}`}${type && `&&type=${type}`}`
      )
      .then(items => {
        dispatch({ type: types.FETCH_ALL_ITEMS_SUCCESS, payload: items.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_ALL_ITEMS_FAILURE});
      });
  };
}

// Obtém os dados de um item
export function fetchItem(id) {
  return dispatch => {
    dispatch({ type: types.LOADING_LIBRARY})
    axios
      .get(`/api/library/${id}`)
      .then(item => {
        dispatch({ type: types.FETCH_ITEM_SUCCESS, payload: item.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_ITEM_FAILURE});
      });
  };
}

// Prepara o estado da aplicação para gerar um formulário de adição de item
export function clearItem() {
  return { type: types.CLEAR_ITEM };
}

// Cria um novo item
export function createItem(data, type) {
  return dispatch => {
    axios
      .post('/api/library', { ...data, type: type })
      .then(function(data) {
        dispatch({ type: types.ADD_ITEM_SUCCESS, payload: true });
      })
      .catch(function(error) {
        dispatch({ type: types.ADD_ITEM_FAILURE });
      });
  };
}

// Edita um item através do seu id
export function updateItem(data, type) {
  return dispatch => {
    axios
      .put(`/api/library/${data._id}`, { ...data, type: type })
      .then(function(item) {
        dispatch({ type: types.UPDATE_ITEM_SUCCESS, payload: true });
        dispatch(fetchItem(item.data._id));
      })
      .catch(function(error) {
        dispatch({ type: types.UPDATE_ITEM_FAILURE });
      });
  };
}

// Remove um item pelo seu id
export function deleteItem(id) {
  return dispatch => {
    axios
      .delete(`/api/library/${id}`)
      .then(function(docRef) {
        dispatch({ type: types.DELETE_ITEM_SUCCESS, payload: id });
      })
      .catch(function(error) {
        dispatch({ type: types.DELETE_ITEM_FAILURE });
      });
  };
}

// Remove um item pelo seu id
export function approveItem(id) {
  return dispatch => {
    axios
      .post(`/api/library/${id}/approve`)
      .then(function(res) {
        dispatch({ type: types.APPROVE_ITEM_FAILURE, payload: res.data._id });
      })
      .catch(function(error) {
        dispatch({ type: types.APPROVE_ITEM_SUCCESS });
      });
  };
}
