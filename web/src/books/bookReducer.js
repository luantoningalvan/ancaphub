const INITIAL_STATE = { allBooks: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_ALL_BOOKS":
            return { ...state, allBooks: action.payload }
        default:
            return state
    }
}