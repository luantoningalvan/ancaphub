import axios from '../services/api';
import types from './_types'

// Obtém a lista de todas as categorias
export function fetchAllCategories() {
  return dispatch => {
    axios
      .get('/api/categories')
      .then(categories => {
        dispatch({ type: types.FETCH_ALL_CATEGORIES, payload: categories.data });
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
      .then(function(category) {
        dispatch({ type: types.CATEGORY_ADDED, payload: category });
        dispatch(fetchAllCategories());
      })
      .catch(function(error) {
        console.error('Erro ao adicionar categoria: ', error);
      });
  };
};

export function setCategoriesLoading() {
  return {
    type: types.CATEGORIES_LOADING
  };
}
