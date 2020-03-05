import alertReducers from './alertReducers';
import itemReducers from './itemReducers';
import authReducer from './authReducer';
import userReducers from './userReducers';
import postReducers from './postReducers';
import notificationReducers from './notificationReducers'
import templateReducers from './templateReducers'
import categoryReducer from './categoryReducer';
import searchReducer from './searchReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  alerts: alertReducers,
  auth: authReducer,
  users: userReducers,
  items: itemReducers,
  categories: categoryReducer,
  posts: postReducers,
  notifications: notificationReducers,
  search: searchReducer,
  template: templateReducers
});

export default rootReducer;
