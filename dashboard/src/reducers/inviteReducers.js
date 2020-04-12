import types from '../actions/_types'

const initialState = { invites: [] };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_ALL_INVITES_SUCCESS:
      return {
        ...state,
        invites: payload
      };
    case types.GENERATE_NEW_INVITES_SUCCESS:
      return {
        ...state,
        invites: [
          ...state.invites,
          ...payload
        ]
      }  
    default:
      return state;
  }
}
