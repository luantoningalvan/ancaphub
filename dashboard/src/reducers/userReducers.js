import types from '../actions/_types'

const initialState = {
  users: [],
  user: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: payload
      };
    case types.FETCH_USER_SUCCESS: 
      return {
        ...state,
        user: payload
      }  
    default:
      return state;
  }
}
