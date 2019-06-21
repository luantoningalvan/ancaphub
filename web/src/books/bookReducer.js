const INITIAL_STATE = { allBooks: [], book: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_ALL_BOOKS":
            return { ...state, allBooks: action.payload }
        case "FETCH_BOOK":
            return { ...state, book: action.payload }        
        default:
            return state
    }
}