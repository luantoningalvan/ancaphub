import { combineReducers } from 'redux'
import booksReducer from './books/booksReducer'

export default combineReducers({
    books: booksReducer,
})