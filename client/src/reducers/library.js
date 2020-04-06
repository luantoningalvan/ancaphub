import { Types } from '../actions/library';

const INITIAL_STATE = {
  articles: [],
  books: [],
  videos: [],
  errorMessage: '',
};

function library(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ARTICLES_SUCCESS:
      return { ...state, articles: [payload.items][0] };
    case Types.GET_BOOKS_SUCCESS:
      return { ...state, books: [payload.items][0] };
    case Types.GET_VIDEOS_SUCCESS:
      return { ...state, videos: [payload.items][0] };
    case Types.SEND_ARTICLE_SUCCESS:
      return { ...state, articles: [payload, ...state.articles] };
    case Types.SEND_BOOK_SUCCESS:
      return { ...state, books: [payload, ...state.books] };
    case Types.SEND_VIDEO_SUCCESS:
      return { ...state, videos: [payload, ...state.videos] };
    case Types.LIBRARY_ERROR:
      return { ...state, errorMessage: payload };
    default:
      return state;
  }
}

export default library;
