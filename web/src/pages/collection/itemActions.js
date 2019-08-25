import axios from 'axios';
import { showSnack } from '../../alerts/alertActions'
import {
  FETCH_ALL_ITEMS,
  FETCH_ITEM,
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
  GET_SAVED_FAIL
} from '../../utils/types'
const BASE_URL = 'http://localhost:3000/api/items';

// Obtém a lista de todos os artigos
export function fetchAllItems(config) {
  const type = config.type || "";
  const page = config.page || 1;
  const pageSize = config.pageSize || 12;
  const order = config.order || 'asc';
  const filter = config.filter || '';
  const filterOn = config.filterOn || '';
  const category = config.category || '';

  return (dispatch) => {
    axios.get(`${BASE_URL}?type=${type}&&page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter && `&&filter=${filter}&&filterOn=${filterOn}`}${category && `&&category=${category}`}`)
      .then((items) => {
        dispatch({ type: FETCH_ALL_ITEMS, payload: items.data });
      }).catch((error) => {
        console.error('Erro ao obter a lista de livros: ', error);
      });
  };
}

export function fetchItem(id) {
  return (dispatch) => {
    axios.get(`${BASE_URL}/${id}`)
      .then((item) => {
        dispatch({ type: FETCH_ITEM, payload: item.data });
      }).catch((error) => {
        console.error('Erro ao obter dados do livro: ', error);
      });
  };
}

export function addItem(data, type) {
  return (dispatch) => {
    axios.post(`${BASE_URL}`, { ...data, type })
      .then((item) => {
        dispatch({ type: ADD_ITEM_SUCCESS, payload: item.data });
        dispatch(showSnack("Artigo Adicionado com Sucesso"));
      }).catch((error) => {
        console.error("Erro ao adicionar livro: ", error);
      })
  }
}

export function selectCategory(category) { return { type: SELECT_ITEMS_CATEGORY, payload: category }; }
export function selectOrder(order) { return { type: SELECT_ITEMS_ORDER, payload: order }; }
export function selectPage(page) { return { type: SELECT_ITEMS_PAGE, payload: page }; }

export const addItemToCollection = (item, post) => async dispatch => {
  try {
    const res = await axios.put('/api/users/addItemToCollection', { item, post })
    dispatch({
      type: ADD_ITEM_TO_COLLECTION_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADD_ITEM_TO_COLLECTION_FAIL
    });
  }
}

export const saveItem = item => async dispatch => {
  try {
    const res = await axios.put('/api/users/saveItem', { item })
    dispatch({
      type: SAVE_ITEM_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SAVE_ITEM_FAIL
    });
  }
}

export function getContributions() {
  return dispatch => {
    axios.get('/api/items/auth/contributions')
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
      })
  }
}

export const getSaved = id => dispatch => {
  axios.get(`/api/items/auth/saved`)
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
}