const INITIAL_STATE = { allItems: [], item: {} }

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case "FETCH_ALL_ITEMS":
      return { ...state, allItems: payload }
    case "NEW_ITEM":
      return { ...state, item: {} }
    case "FETCH_ITEM":
      return { ...state, item: payload }
    case "ITEM_DELETED":
    case "ITEM_APPROVED":
      return {
        ...state,
        allItems: { ...state.allItems, items: state.allItems.items.filter((value) => { return value._id != payload }) }
      }
    default:
      return state
  }
}