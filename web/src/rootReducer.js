import bookReducers from './books/bookReducers'
import articleReducers from './articles/articleReducers'
import authReducer from './auth/authReducer'
import userReducers from './users/userReducers'
import categoriesReducer from './components/categories/categoriesReducer'
import errorReducer from './errors/errorReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    books: bookReducers,
    articles: articleReducers,
    categories: categoriesReducer,
    users: userReducers,
    auth: authReducer,
    errors: errorReducer
})

export default rootReducer
