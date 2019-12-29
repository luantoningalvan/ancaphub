import types from '../actions/_types'

const INITIAL_STATE = {
  searchResults: [],
  loading: true
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SEARCH_TERM_SUCCESS:
      return {
        searchResults: payload,
        loading: false
      }
    case types.SEARCH_TERM_FAILURE:
      return {
        loading: false
      }    
    default:
      return state  
  }
}
