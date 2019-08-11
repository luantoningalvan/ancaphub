import axios from 'axios'
import { toastr } from 'react-redux-toastr'
const BASE_URL = 'http://localhost:3000/api/items'

// Obtém a lista de todos os itens
export function fetchAllItems(page = 1, { type, category }, status = 'published') {
  return (dispatch) => {
    axios.get(`${BASE_URL}?page=${page}&&status=${status}${category && `&&category=${category}`}${type && `&&type=${type}`}`)
      .then((items) => {
        dispatch({ type: "FETCH_ALL_ITEMS", payload: items.data });
      }).catch((error) => {
        console.error("Erro ao obter a lista de itens: ", error);
      })
  }
}

// Obtém os dados de um item
export function fetchItem(id) {
  return (dispatch) => {
    axios.get(`${BASE_URL}/${id}`)
      .then((item) => {
        dispatch({ type: "FETCH_ITEM", payload: item.data });
      }).catch((error) => {
        console.error("Erro ao obter dados do item: ", error);
      })
  }
}

// Prepara o estado da aplicação para gerar um formulário de adição de item
export function prepareToCreateNewItem() {
  return { type: "NEW_ITEM" }
}

// Cria um novo item
export function createItem(data, type) {
  return (dispatch) => {
    axios.post(BASE_URL, { ...data, type: type })
      .then(function (data) {
        toastr.success('Sucesso', 'Item Adicionado com Sucesso.')
        dispatch({ type: "ITEM_ADDED", payload: true });
      })
      .catch(function (error) {
        console.error("Erro ao adicionar item: ", error);
      });
  }
}

// Edita um item através do seu id
export function updateItem(data, type) {
  return (dispatch) => {
    axios.put(`${BASE_URL}/${data._id}`, { ...data, type: type })
      .then(function (item) {
        toastr.success('Sucesso', 'Item Atualizado com Sucesso.')
        dispatch({ type: "ITEM_UPDATED", payload: true });
        dispatch(fetchItem(item.data._id));
      })
      .catch(function (error) {
        console.error("Erro ao atualizar item: ", error);
      });

  }
}

// Remove um item pelo seu id
export function deleteItem(id) {
  return (dispatch) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then(function (docRef) {
        toastr.success('Sucesso', 'Item Removido com Sucesso.')
        dispatch({ type: "ITEM_DELETED", payload: id });
      })
      .catch(function (error) {
        console.error("Erro ao deletar item: ", error);
      });
  }
}
