import bookReducer from './books/bookReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    books: bookReducer
})

export default rootReducer