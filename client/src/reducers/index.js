import alertReducers from './alertReducers';
import itemReducers from './itemReducers';
import authReducer from './authReducer';
import userReducers from './userReducers';
import postReducers from './postReducers';
import notificationReducers from './notificationReducers'
import categoriesReducer from './categoriesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  alerts: alertReducers,
  auth: authReducer,
  users: userReducers,
  items: itemReducers,
  categories: categoriesReducer,
  posts: postReducers,
  notifications: notificationReducers
});

export default rootReducer;
