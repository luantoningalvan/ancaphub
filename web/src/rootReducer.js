import bookReducer from './books/bookReducer'
import authReducer from './auth/authReducer'
import errorReducer from './errors/errorReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    books: bookReducer,
    auth: authReducer,
    errors: errorReducer
})

export default rootReducer