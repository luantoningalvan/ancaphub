const INITIAL_STATE = { allBooks: [], book: [], filters: { category: '', order: 'asc', page: 1 } }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_ALL_BOOKS":
            return { ...state, allBooks: action.payload }
        case "FETCH_BOOK":
            return { ...state, book: action.payload }        
        case "SELECT_BOOKS_CATEGORY": 
            return { ...state, filters: { ...state.filters, category: action.payload } }
        case "SELECT_BOOKS_ORDER": 
            return { ...state, filters: { ...state.filters, order: action.payload } }
        case "SELECT_BOOKS_PAGE": 
            return { ...state, filters: { ...state.filters, page: action.payload } }                    
        default:
            return state
    }
}