import { FETCH_ALL_BOOKS, FETCH_BOOK, SELECT_BOOKS_CATEGORY, SELECT_BOOKS_ORDER, SELECT_BOOKS_PAGE } from '../utils/types'

const INITIAL_STATE = { loading: true, allBooks: [], book: [], filters: { category: '', order: 'asc', page: 1 } }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_BOOKS:
      return { ...state, allBooks: action.payload, loading: false }
    case FETCH_BOOK:
      return { ...state, book: action.payload, loading: false }
    case SELECT_BOOKS_CATEGORY:
      return { ...state, filters: { ...state.filters, category: action.payload } }
    case SELECT_BOOKS_ORDER:
      return { ...state, filters: { ...state.filters, order: action.payload } }
    case SELECT_BOOKS_PAGE:
      return { ...state, filters: { ...state.filters, page: action.payload } }
    default:
      return state
  }
}