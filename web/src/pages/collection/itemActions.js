import axios from 'axios';
import { showSnack } from '../../alerts/alertActions'
import {
  FETCH_ALL_ITEMS,
  FETCH_ITEM,
  SELECT_ITEMS_CATEGORY,
  ADD_ITEM_SUCCESS,
  SELECT_ITEMS_ORDER,
  SELECT_ITEMS_PAGE
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

  console.log(type)

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