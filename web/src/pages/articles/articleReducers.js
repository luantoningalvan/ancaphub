import {
  FETCH_ALL_ARTICLES,
  FETCH_ARTICLE,
  SELECT_ARTICLES_CATEGORY,
  SELECT_ARTICLES_ORDER,
  SELECT_ARTICLES_PAGE
} from '../../utils/types'

const INITIAL_STATE = { allArticles: [], article: [], filters: { category: '', order: 'asc', page: 1 } }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_ARTICLES:
      return { ...state, allArticles: action.payload }
    case FETCH_ARTICLE:
      return { ...state, article: action.payload }
    case SELECT_ARTICLES_CATEGORY:
      return { ...state, filters: { ...state.filters, category: action.payload } }
    case SELECT_ARTICLES_ORDER:
      return { ...state, filters: { ...state.filters, order: action.payload } }
    case SELECT_ARTICLES_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } }
    default:
      return state
  }
}
