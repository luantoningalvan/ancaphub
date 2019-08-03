const INITIAL_STATE = { allBooks: [], book: {} }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_ALL_BOOKS":
      return { ...state, allBooks: action.payload }
    case "NEW_BOOK":
      return { ...state, book: {} }
    case "FETCH_BOOK":
      return { ...state, book: action.payload }
    case "BOOK_DELETED":
      return {
        ...state,
        allBooks: { ...state.allBooks, items: state.allBooks.items.filter((value) => { return value._id != payload }) }
      }
    default:
      return state
  }
}