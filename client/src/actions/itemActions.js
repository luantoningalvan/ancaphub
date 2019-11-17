import axios from '../services/api';
import { showSnack } from './alertActions';
import {
  ITEMS_LOADING,
  FETCH_ALL_ITEMS,
  FETCH_ITEM,
  FETCH_RATES,
  SELECT_ITEMS_CATEGORY,
  ADD_ITEM_SUCCESS,
  SELECT_ITEMS_ORDER,
  SELECT_ITEMS_PAGE,
  ADD_ITEM_TO_COLLECTION_SUCCESS,
  ADD_ITEM_TO_COLLECTION_FAIL,
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_FAIL,
  GET_CONTRIBUTIONS_SUCCESS,
  GET_CONTRIBUTIONS_FAIL,
  GET_SAVED_SUCCESS,
  GET_SAVED_FAIL,
  ADD_RATE_SUCCESS
} from '../utils/types';

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
    dispatch({ type: ITEMS_LOADING });
    axios
      .get(
        `/api/items?type=${type}&&page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter &&
        `&&filter=${filter}&&filterOn=${filterOn}`}${category && category !== "all" ?
          `&&category=${category}` : ''}`
      )
      .then(items => {
        dispatch({ type: FETCH_ALL_ITEMS, payload: items.data });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de itens: ', error);
      });
  };
}

export function fetchItem(id) {
  return dispatch => {
    dispatch({ type: ITEMS_LOADING });
    axios
      .get(`/api/items/${id}`)
      .then(item => {
        dispatch({ type: FETCH_ITEM, payload: item.data });
      })
      .catch(error => {
        console.error('Erro ao obter dados do item: ', error);
      });
  };
}

export function fetchRates(item) {
  return dispatch => {
    axios
      .get(`/api/rates/${item}`)
      .then(rates => {
        dispatch({ type: FETCH_RATES, payload: rates.data });
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
        dispatch({ type: ADD_RATE_SUCCESS, payload: rate.data });
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
        dispatch({ type: ADD_ITEM_SUCCESS, payload: item.data });
        dispatch(showSnack('Artigo Adicionado com Sucesso'));
      })
      .catch(error => {
        console.error('Erro ao adicionar item: ', error);
      });
  };
}

export function selectCategory(category) {
  return { type: SELECT_ITEMS_CATEGORY, payload: category };
}
export function selectOrder(order) {
  return { type: SELECT_ITEMS_ORDER, payload: order };
}
export function selectPage(page) {
  return { type: SELECT_ITEMS_PAGE, payload: page };
}

export const addItemToCollection = (item, post) => async dispatch => {
  try {
    const res = await axios.put('/api/users/addItemToCollection', {
      item,
      post
    });
    dispatch({
      type: ADD_ITEM_TO_COLLECTION_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_COLLECTION_FAIL
    });
  }
};

export const saveItem = item => async dispatch => {
  try {
    const res = await axios.put('/api/users/saveItem', { item });
    dispatch({
      type: SAVE_ITEM_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SAVE_ITEM_FAIL
    });
  }
};

export function getContributions() {
  return dispatch => {
    axios
      .get('/api/items/auth/contributions')
      .then(res => {
        dispatch({
          type: GET_CONTRIBUTIONS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_CONTRIBUTIONS_FAIL
        });
      });
  };
}

export const getSaved = id => dispatch => {
  axios
    .get(`/api/items/auth/saved`)
    .then(collection => {
      dispatch({
        type: GET_SAVED_SUCCESS,
        payload: collection.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_SAVED_FAIL,
        payload: err
      });
    });
};
