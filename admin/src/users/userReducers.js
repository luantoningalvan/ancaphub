const initialState = {
  users: null
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'FETCH_USERS_LIST':
      return {
        ...state,
        users: payload
      };
    default:
      return state;
  }
}