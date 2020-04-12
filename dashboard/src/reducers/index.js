import { combineReducers } from 'redux';
import collectionReducers from './collectionReducers';
import userReducers from './userReducers';
import categoryReducers from './categoryReducers';
import authReducer from './authReducers';
import inviteReducers from './inviteReducers';

export default combineReducers({
  collection: collectionReducers,
  users: userReducers,
  auth: authReducer,
  categories: categoryReducers,
  invites: inviteReducers
});
