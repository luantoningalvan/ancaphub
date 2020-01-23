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
    case types.ADD_BOOKMARK_SUCCESS:
    case types.ADD_ITEM_TO_LIBRARY_SUCCESS:
      if (payload.location === 'search') {
        return {
          ...state,
          searchResults: {
            ...state.searchResults,
            items: {
              ...state.searchResults.items,
              items: state.searchResults.items.items.map(item =>
                item._id === payload.item._id ? { ...item, ...payload.item } : item
              )
            }
          }
        };
      }
    default:
      return state
  }
}
