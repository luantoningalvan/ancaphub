import {
  FETCH_ALL_ITEMS,
  FETCH_ITEM,
  SELECT_ITEMS_CATEGORY,
  SELECT_ITEMS_ORDER,
  SELECT_ITEMS_PAGE,
  FETCH_RATES,
  ADD_RATE_SUCCESS
} from '../../utils/types';

const INITIAL_STATE = {
  allItems: [],
  item: [],
  filters: { category: '', order: 'asc', page: 1 }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_ITEMS:
      return { ...state, allItems: action.payload };
    case FETCH_ITEM:
      return { ...state, item: action.payload };
    case FETCH_RATES:
      return { ...state, item: { ...state.item, rates: action.payload } };
    case ADD_RATE_SUCCESS:
      return {
        ...state,
        item: { ...state.item, rates: [...state.item.rates, action.payload] }
      };
    case SELECT_ITEMS_CATEGORY:
      return {
        ...state,
        filters: { ...state.filters, category: action.payload }
      };
    case SELECT_ITEMS_ORDER:
      return { ...state, filters: { ...state.filters, order: action.payload } };
    case SELECT_ITEMS_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } };
    default:
      return state;
  }
};
