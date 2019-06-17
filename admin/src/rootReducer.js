import { combineReducers } from 'redux'
import booksReducer from './books/booksReducer'
import authReducer from './auth/authReducer'
import errorReducer from './errors/errorReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    books: booksReducer,
    auth: authReducer,
    errors: errorReducer,
    toastr: toastrReducer
})