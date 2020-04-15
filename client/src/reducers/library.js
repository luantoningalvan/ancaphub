import { Types } from '../actions/library';

const INITIAL_STATE = {
  loading: true,
  recentItems: [],
  videos: [],
  articles: [],
  books: [],
  singleItem: {},
  errorMessage: '',
};

function library(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_BOOKS_REQUEST:
    case Types.GET_VIDEOS_REQUEST:
    case Types.GET_ARTICLES_REQUEST:
    case Types.GET_SINGLE_ITEM_REQUEST:
      return { ...state, loading: true };
    case Types.GET_BOOKS_SUCCESS:
      return { ...state, books: payload.items.items, loading: false };
    case Types.GET_ARTICLES_SUCCESS:
      return { ...state, articles: payload.items.items, loading: false };
    case Types.GET_VIDEOS_SUCCESS:
      return { ...state, videos: payload.items.items, loading: false };
    case Types.CREATE_ITEM_SUCCESS:
      return { ...state, items: [payload, ...state.items] };
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
