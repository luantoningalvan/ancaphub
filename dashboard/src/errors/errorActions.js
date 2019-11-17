// Retorna os erros
export const setErrors = (msg, status, id = null) => {
  return {
    type: 'SET_ERRORS',
    payload: { msg, status, id }
  };
};

// Limpa os erros
export const clearErrors = () => {
  return {
    type: 'CLEAR_ERRORS'
  };
};
