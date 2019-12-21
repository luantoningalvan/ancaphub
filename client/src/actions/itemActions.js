import axios from '../services/api';
import { showSnack } from './alertActions';
import types from './_types'

// Obtém a lista de todos os artigos
export function fetchAllItems(config) {
  const type = config.type || '';
  const page = config.page || 1;
  const pageSize = config.pageSize || 12;
  const order = config.order || 'asc';
  const filter = config.filter || '';
  const filterOn = config.filterOn || '';
  const category = config.category || '';

  return dispatch => {
    dispatch({ type: types.ITEMS_LOADING });
    axios
      .get(
        `/api/items?type=${type}&&page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter &&
        `&&filter=${filter}&&filterOn=${filterOn}`}${category && category !== "all" ?
          `&&category=${category}` : ''}`
      )
      .then(items => {
        dispatch({ type: types.FETCH_ALL_ITEMS, payload: items.data });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de itens: ', error);
      });
  };
}

export function fetchItem(id) {
  return dispatch => {
    dispatch({ type: types.ITEMS_LOADING });
    axios
      .get(`/api/items/${id}`)
      .then(item => {
        dispatch({ type: types.FETCH_ITEM_SUCCESS, payload: item.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_ITEM_FAILURE, payload: error });
      });
  };
}

export function fetchRates(item) {
  return dispatch => {
    axios
      .get(`/api/rates/${item}`)
      .then(rates => {
        dispatch({ type: types.FETCH_RATES, payload: rates.data });
      })
      .catch(error => {
        console.error('Erro ao obter avaliações do item: ', error);
      });
  };
}

export function addRate({ item, value, comment }) {
  return dispatch => {
    axios
      .post(`/api/rates`, { item, value, comment })
      .then(rate => {
        console.log('teste');
        dispatch({ type: types.ADD_RATE_SUCCESS, payload: rate.data });
        dispatch(showSnack('Avaliação adicionado com sucesso'));
      })
      .catch(error => {
        console.error('Erro ao avaliar item: ', error);
      });
  };
}
export function addItem(data, type) {
  return dispatch => {
    axios
      .post(`/api/items`, { ...data, type })
      .then(item => {
        dispatch({ type: types.ADD_ITEM_SUCCESS, payload: item.data });
        dispatch(showSnack('Item enviado com Sucesso'));
      })
      .catch(error => {
        dispatch(showSnack('Item enviado com Sucesso', 'error'));
      });
  };
}

export function selectCategory(category) {
  return { type: types.SELECT_ITEMS_CATEGORY, payload: category };
}
export function selectOrder(order) {
  return { type: types.SELECT_ITEMS_ORDER, payload: order };
}
export function selectPage(page) {
  return { type: types.SELECT_ITEMS_PAGE, payload: page };
}

export const addItemToCollection = (item, post) => async dispatch => {
  try {
    const res = await axios.put('/api/users/addItemToCollection', {
      item,
      post
    });
    dispatch({
      type: types.ADD_ITEM_TO_COLLECTION_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: types.ADD_ITEM_TO_COLLECTION_FAIL
    });
  }
};

export const saveItem = item => async dispatch => {
  try {
    const res = await axios.put('/api/users/saveItem', { item });
    dispatch({
      type: types.SAVE_ITEM_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: types.SAVE_ITEM_FAIL
    });
  }
};

export function getContributions() {
  return dispatch => {
    axios
      .get('/api/items/auth/contributions')
      .then(res => {
        dispatch({
          type: types.GET_CONTRIBUTIONS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.GET_CONTRIBUTIONS_FAIL
        });
      });
  };
}

export const getSaved = id => dispatch => {
  axios
    .get(`/api/items/auth/saved`)
    .then(collection => {
      dispatch({
        type: types.GET_SAVED_SUCCESS,
        payload: collection.data
      });
    })
    .catch(err => {
      dispatch({
        type: types.GET_SAVED_FAIL,
        payload: err
      });
    });
};
