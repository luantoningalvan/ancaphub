import {
  SET_ALERTS,
  CLEAR_ALERTS,
  SHOW_SNACK
} from '../utils/types'

// Retorna os erros
export const setAlerts = (msg, status, id = null) => {
  return {
    type: SET_ALERTS,
    payload: { msg, status, id }
  };
};

export const showSnack = (msg, status = 'success') => {
  return {
    type: SHOW_SNACK,
    payload: { msg, status }
  }
}

// Limpa os erros
export const clearAlerts = () => {
  return {
    type: CLEAR_ALERTS
  };
};