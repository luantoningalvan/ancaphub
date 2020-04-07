import { Types } from '../actions/library';

const INITIAL_STATE = {
  items: [],
  singleItem: null,
  errorMessage: '',
};

function library(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ITEMS_SUCCESS:
      return { ...state, items: payload.items.items };
    case Types.CREATE_ITEM_SUCCESS:
      return { ...state, items: [payload, ...state.items] };
    case Types.GET_SINGLE_ITEM_SUCCESS:
      return { ...state, singleItem: { ...payload } };
    case Types.LIBRARY_ERROR:
      return { ...state, errorMessage: payload.errorMessage };
    default:
      return state;
  }
}

export default library;
