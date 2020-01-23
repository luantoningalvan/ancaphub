import types from '../actions/_types'
const INITIAL_STATE = {
  allItems: [],
  item: {},
  loading: true,
  filters: { category: 'all', order: 'asc', page: 1 }
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case types.ITEMS_LOADING:
      return { ...state, loading: true }
    case types.FETCH_ALL_ITEMS:
    case types.GET_BOOKMARKS_SUCCESS: 
      return { ...state, allItems: payload, loading: false };
    case types.FETCH_ITEM_SUCCESS: 
      return { ...state, item: payload, loading: false };
    case types.FETCH_ITEM_FAILURE:
      return {...state, loading:false, item: {}} 
    case types.ADD_ITEM_TO_LIBRARY_SUCCESS:
    case types.ADD_BOOKMARK_SUCCESS:
      if(payload.location === 'items') {
        return {
          ...state,
          allItems:{
            ...state.allItems,
            items: state.allItems.items.map(item =>
              item._id === payload.item._id ? { ...item, ...payload.item } : item
            )
          } 
        };
      }
    case types.FETCH_RATES:
      return { ...state, item: { ...state.item, rates: payload } };
    case types.ADD_RATE_SUCCESS:
      return {
        ...state,
        item: { ...state.item, rates: [...state.item.rates, payload] }
      };
    case types.SELECT_ITEMS_CATEGORY:
      return {
        ...state,
        filters: { ...state.filters, category: payload }
      };
    case types.SELECT_ITEMS_ORDER:
      return { ...state, filters: { ...state.filters, order: payload } };
    case types.SELECT_ITEMS_PAGE:
      return { ...state, filters: { ...state.filters, page: payload } };
    default:
      return state;
  }
};
