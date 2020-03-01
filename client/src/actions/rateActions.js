import axios from '../services/api';
import { showSnack } from './alertActions';
import types from './_types'


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
        dispatch({ type: types.ADD_RATE_SUCCESS, payload: rate.data });
        dispatch(showSnack('Avaliação adicionado com sucesso'));
      })
      .catch(err => {
        dispatch({
          type: types.ADD_RATE_FAILURE,
          payload: err.response.data.message
        })
      });
  };
}