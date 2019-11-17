import axios from '../../services/api';
import { toastr } from 'react-redux-toastr';

// Obtém a lista de todas as categorias
export function fetchAllCategories() {
  return dispatch => {
    axios
      .get('/api/categories')
      .then(categories => {
        dispatch({ type: 'FETCH_ALL_CATEGORIES', payload: categories.data });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de categorias: ', error);
      });
  };
}

// Cria uma nova categoria
export const createCategory = data => {
  return dispatch => {
    axios
      .post('/api/categories', data)
      .then(category => {
        dispatch({ type: 'CATEGORY_ADDED', payload: category });
        dispatch(fetchAllCategories());
      })
      .catch(function(error) {
        console.error('Erro ao adicionar categoria: ', error);
      });
  };
};

export const editCategory = data => {
  return dispatch => {
    axios
    .put(`/api/categories/${data._id}`, data)
    .then(category => {
      toastr.success('Sucesso', 'Categoria modificada com Sucesso.');
      dispatch({type: 'CATEGORY_EDITED', payload: category.data})
    })
  }
}

export function setCategoriesLoading() {
  return {
    type: 'CATEGORIES_LOADING'
  };
}
