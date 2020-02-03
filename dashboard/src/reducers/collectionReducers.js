import types from '../actions/_types'

const INITIAL_STATE = { allItems: [], item: {}, loading: false };

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOADING_LIBRARY: 
      return { ...state, loading: true}
    case types.CLEAR_ITEM: 
      return { ...state, item: {} };
    case types.FETCH_ALL_ITEMS_SUCCESS: 
      return { ...state, allItems: payload };
    case types.FETCH_ITEM_SUCCESS: 
      return { ...state, item: payload, loading: false };
    case types.DELETE_ITEM_SUCCESS: 
    case types.APPROVE_ITEM_SUCCESS: 
      return {
        ...state,
        allItems: {
          ...state.allItems,
          items: state.allItems.items.filter(value => {
            return value._id !== payload;
          })
        }
      };
    default:
      return state;
  }
};
