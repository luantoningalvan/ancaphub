import types from './_types'

// Retorna os erros
export const setAlerts = (msg, status, id = null) => {
  return {
    type: types.SET_ALERTS,
    payload: { msg, status, id }
  };
};

export const showSnack = (msg, status = 'success') => {
  return {
    type: types.SHOW_SNACK,
    payload: { msg, status }
  };
};

// Limpa os erros
export const clearAlerts = () => {
  return {
    type: types.CLEAR_ALERTS
  };
};
