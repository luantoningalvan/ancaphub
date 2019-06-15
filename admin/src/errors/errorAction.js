import { GET_ERRORS, CLEAR_ERRORS } from '../types';

// Retorna os erros
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// Limpa os erros
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};