import { combineReducers } from 'redux'
import bookReducers from './books/bookReducers'
import articleReducers from './articles/articleReducers'
import categoriesReducer from './components/categories/categoriesReducer'
import authReducer from './auth/authReducer'
import errorReducers from './errors/errorReducers'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    books: bookReducers,
    articles: articleReducers,
    auth: authReducer,
    categories: categoriesReducer,
    errors: errorReducers,
    toastr: toastrReducer
})
