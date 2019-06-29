import { combineReducers } from 'redux'
import bookReducers from './books/bookReducers'
import articleReducers from './articles/articleReducers'
import categoriesReducer from './components/categories/categoriesReducer'
import authReducer from './auth/authReducer'
import errorReducer from './errors/errorReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    books: bookReducers,
    articles: articleReducers,
    auth: authReducer,
    categories: categoriesReducer,
    errors: errorReducer,
    toastr: toastrReducer
})
