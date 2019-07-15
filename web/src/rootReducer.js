import bookReducers from './books/bookReducers'
import errorReducers from './errors/errorReducers'
import articleReducers from './articles/articleReducers'
import authReducer from './auth/authReducer'
import userReducers from './users/userReducers'
import categoriesReducer from './components/categories/categoriesReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    errors: errorReducers,
    auth: authReducer,
    users: userReducers,
    books: bookReducers,
    articles: articleReducers,
    categories: categoriesReducer,
})

export default rootReducer
