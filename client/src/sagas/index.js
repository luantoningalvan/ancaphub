import { all } from 'redux-saga/effects';

import UserSagas from './users';
import AuthSagas from './auth';
import PostSagas from './posts';
import SettingsSagas from './settings';
import CommentSagas from './comments';
import LibrarySagas from './library';
import RelationshipsSagas from './relationships';

export default function* rootSaga() {
  yield all([
    ...UserSagas,
    ...AuthSagas,
    ...PostSagas,
    ...SettingsSagas,
    ...CommentSagas,
    ...LibrarySagas,
    ...RelationshipsSagas
  ]);
}
