import { combineReducers } from 'redux';
import users from './users';
import auth from './auth';
import posts from './posts';

export default combineReducers({
  users,
  auth,
  posts,
});
