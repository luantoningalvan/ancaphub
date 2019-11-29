import types from '../actions/_types'
const INITIAL_STATE = {
  allItems: [],
  item: {},
  loading: true,
  filters: { category: 'all', order: 'asc', page: 1 }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ITEMS_LOADING:
      return { ...state, loading: true }
    case types.FETCH_ALL_ITEMS:
      return { ...state, allItems: action.payload, loading: false };
    case types.FETCH_ITEM_SUCCESS:
      return { ...state, item: action.payload, loading: false };
    case types.FETCH_ITEM_FAILURE:
      return {...state, loading:false, item: {}} 
    case types.FETCH_RATES:
      return { ...state, item: { ...state.item, rates: action.payload } };
    case types.ADD_RATE_SUCCESS:
      return {
        ...state,
        item: { ...state.item, rates: [...state.item.rates, action.payload] }
      };
    case types.SELECT_ITEMS_CATEGORY:
      return {
        ...state,
        filters: { ...state.filters, category: action.payload }
      };
    case types.SELECT_ITEMS_ORDER:
      return { ...state, filters: { ...state.filters, order: action.payload } };
    case types.SELECT_ITEMS_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } };
    default:
      return state;
  }
};
