import types from '../actions/_types'

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: payload
      };
    default:
      return state;
  }
}
