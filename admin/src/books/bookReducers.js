const INITIAL_STATE = { allBooks: [], book: {} }

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case "FETCH_ALL_BOOKS":
      return { ...state, allBooks: payload }
    case "NEW_BOOK":
      return { ...state, book: {} }
    case "FETCH_BOOK":
      return { ...state, book: payload }
    case "BOOK_DELETED":
      return {
        ...state,
        allBooks: { ...state.allBooks, items: state.allBooks.items.filter((value) => { return value._id != payload }) }
      }
    default:
      return state
  }
}