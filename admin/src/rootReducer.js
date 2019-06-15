import { combineReducers } from 'redux'
import booksReducer from './books/booksReducer'
import authReducer from './auth/authReducer'
import errorReducer from './errors/errorReducer'

export default combineReducers({
    books: booksReducer,
    auth: authReducer,
    errors: errorReducer
})