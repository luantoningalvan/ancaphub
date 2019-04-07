import { combineReducers } from 'redux'
import booksReducer from './books/booksReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    books: booksReducer,
    form: formReducer
})