const INITIAL_STATE = { allArticles: [], article: {} }

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case "FETCH_ALL_ARTICLES":
      return { ...state, allArticles: payload }
    case "NEW_ARTICLE":
      return { ...state, article: {} }
    case "FETCH_ARTICLE":
      return { ...state, article: payload }
    case "ARTICLE_DELETED":
      return {
        ...state,
        allArticles: { ...state.allArticles, items: state.allArticles.items.filter((value) => { return value._id != payload }) }
      }
    default:
      return state
  }
}