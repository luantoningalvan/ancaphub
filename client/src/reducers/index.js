import { combineReducers } from 'redux';
import users from './users';
import usersCount from './usersCount';
import auth from './auth';
import posts from './posts';
import profile from './profile';
import comments from './comments';
import library from './library';

export default combineReducers({
  users,
  usersCount,
  auth,
  posts,
  profile,
  comments,
  library,
});
