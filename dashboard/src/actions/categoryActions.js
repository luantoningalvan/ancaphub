import types from './_types'
import axios from '../services/api';

// Obtém a lista de todas as categorias
export function fetchAllCategories() {
  return dispatch => {
    axios
      .get('/api/categories')
      .then(categories => {
        dispatch({ type: types.FETCH_ALL_CATEGORIES_SUCCESS, payload: categories.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_ALL_CATEGORIES_FAILURE});
      });
  };
}

// Cria uma nova categoria
export const createCategory = data => {
  return dispatch => {
    axios
      .post('/api/categories', data)
      .then(category => {
        dispatch({ type: types.ADD_CATEGORY_SUCCESS, payload: category });
        dispatch(fetchAllCategories());
      })
      .catch(function(error) {
        dispatch({ type: types.ADD_CATEGORY_FAILURE});
      });
  };
};

export const editCategory = data => {
  return dispatch => {
    axios
    .put(`/api/categories/${data._id}`, data)
    .then(category => {
      dispatch({type: types.UPDATE_CATEGORY_SUCCESS, payload: category.data})
    })
    .catch(function(error) {
      dispatch({ type: types.UPDATE_CATEGORY_FAILURE});
    });
  }
}

export const deleteCategory = category => {
  return dispatch => {
    axios
    .delete(`/api/categories/${category}`)
    .then(category => {
      dispatch({ type: types.DELETE_CATEGORY_SUCCESS, payload: { _id: category } })
    })
    .catch(function(error) {
      dispatch({ type: types.DELETE_CATEGORY_FAILURE });
    });
  }
}

export function setCategoriesLoading() {
  return {
    type: types.LOADING_CATEGORIES
  };
}