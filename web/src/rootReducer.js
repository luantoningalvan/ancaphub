import alertReducers from './alerts/alertReducers';
import itemReducers from './pages/collection/itemReducers';
import authReducer from './auth/authReducer';
import userReducers from './pages/users/userReducers';
import postReducers from './components/posts/postReducers';
import categoriesReducer from './components/categories/categoriesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  alerts: alertReducers,
  auth: authReducer,
  users: userReducers,
  items: itemReducers,
  categories: categoriesReducer,
  posts: postReducers
});

export default rootReducer;
