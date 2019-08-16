import alertReducers from './alerts/alertReducers'
import bookReducers from './pages/books/bookReducers'
import articleReducers from './pages/articles/articleReducers'
import authReducer from './auth/authReducer'
import userReducers from './pages/users/userReducers'
import postReducers from './components/posts/postReducers'
import categoriesReducer from './components/categories/categoriesReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    alerts: alertReducers,
    auth: authReducer,
    users: userReducers,
    books: bookReducers,
    articles: articleReducers,
    categories: categoriesReducer,
    posts: postReducers
})

export default rootReducer
