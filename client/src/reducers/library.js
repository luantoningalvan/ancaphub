import { Types } from '../actions/library';

const INITIAL_STATE = {
  videos: [],
  articles: [],
  books: [],
  singleItem: null,
  errorMessage: '',
};

function library(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_BOOKS_SUCCESS:
      return { ...state, books: payload.items.items };
    case Types.GET_ARTICLES_SUCCESS:
      return { ...state, articles: payload.items.items };
    case Types.GET_VIDEOS_SUCCESS:
      return { ...state, videos: payload.items.items };
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
