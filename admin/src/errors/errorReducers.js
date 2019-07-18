const initialState = {
  errors: null
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'SET_ERRORS':
      return {
        ...state,
        errors: payload
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
}