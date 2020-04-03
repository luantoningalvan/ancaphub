import { all } from 'redux-saga/effects';

import UserSagas from './users';
import AuthSagas from './auth';
import PostSagas from './posts';

export default function* rootSaga() {
  yield all([...UserSagas, ...AuthSagas, ...PostSagas]);
}
