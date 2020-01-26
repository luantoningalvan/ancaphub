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
        `/api/library?type=${type}&&page=${page}&&pageSize=${pageSize}&&orderBy=${order}${filter &&
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
      .get(`/api/library/${id}`)
      .then(item => {
        dispatch({ type: types.FETCH_ITEM_SUCCESS, payload: item.data });
      })
      .catch(error => {
        dispatch({ type: types.FETCH_ITEM_FAILURE, payload: error });
      });
  };
}

export function addItem(data, type) {
  return dispatch => {
    axios
      .post(`/api/library`, { ...data, type })
      .then(item => {
        dispatch({ type: types.ADD_ITEM_SUCCESS, payload: item.data });
        dispatch(showSnack('Item enviado com Sucesso'));
      })
      .catch(error => {
        dispatch(showSnack('Erro ao enviar item', 'error'));
      });
  };
}

export const addToLibrary = (item, post, location = 'items') => async dispatch => {
  try {
    const res = await axios.post('/api/library/auth/addtolibrary', { item, post });
    dispatch({
      type: types.ADD_ITEM_TO_LIBRARY_SUCCESS,
      payload: { item: res.data, location}
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: types.ADD_ITEM_TO_LIBRARY_FAIL
    });
  }
};

export function getContributions() {
  return dispatch => {
    axios
      .get('/api/library/auth/contributions')
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

export function selectCategory(category) {
  return { type: types.SELECT_ITEMS_CATEGORY, payload: category };
}
export function selectOrder(order) {
  return { type: types.SELECT_ITEMS_ORDER, payload: order };
}
export function selectPage(page) {
  return { type: types.SELECT_ITEMS_PAGE, payload: page };
}
