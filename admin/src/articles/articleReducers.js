const INITIAL_STATE = { allArticles: [], article: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_ALL_ARTICLES":
            return { ...state, allArticles: action.payload }
        case "NEW_ARTICLE":
            return { ...state, article: {} }
        case "FETCH_ARTICLE":
            return { ...state, article: action.payload }    
        default:
            return state
    }
}