import { Types } from '../actions/library';

const INITIAL_STATE = {
  loading: true,
  items: [],
  recentItems: [],
  singleItem: {},
  errorMessage: '',
};

function library(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ITEMS_REQUEST:
    case Types.GET_SINGLE_ITEM_REQUEST:
      return { ...state, loading: true };
    case Types.GET_ITEMS_SUCCESS:
    case Types.CREATE_ITEM_SUCCESS:
      return { 
        ...state, 
        items: payload,
        loading:false
      };
    case Types.GET_SINGLE_ITEM_SUCCESS:
      return { ...state, singleItem: { ...payload }, loading: false };
    case Types.GET_RECENT_ITEMS_SUCCESS:
      return { ...state, recentItems: payload };
    case Types.LIBRARY_ERROR:
      return { ...state, errorMessage: payload.errorMessage };
    default:
      return state;
  }
}

export default library;
