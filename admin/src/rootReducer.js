import { combineReducers } from 'redux'
import collectionReducers from './collection/collectionReducers'
import userReducers from './users/userReducers'
import categoriesReducer from './components/categories/categoriesReducer'
import authReducer from './auth/authReducer'
import errorReducers from './errors/errorReducers'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
    collection: collectionReducers,
    users: userReducers,
    auth: authReducer,
    categories: categoriesReducer,
    errors: errorReducers,
    toastr: toastrReducer
})
