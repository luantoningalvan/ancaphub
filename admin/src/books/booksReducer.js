const INITIAL_STATE = { list: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_BOOKS":
            console.log(action.payload.data)
            return { ...state, list: action.payload }
        default:
            return state
    }
}