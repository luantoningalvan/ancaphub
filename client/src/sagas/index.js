import { all } from 'redux-saga/effects';

import UserSagas from './users';
import AuthSagas from './auth';
import PostSagas from './posts';
import SettingsSagas from './settings';
import CommentSagas from './comments';
import LibrarySagas from './library';
import RelationshipsSagas from './relationships';
import NotificationsSagas from './notifications';
import SearchSagas from './search';
import CategoriesSagas from './categories';

export default function* rootSaga() {
  yield all([
    ...UserSagas,
    ...AuthSagas,
    ...PostSagas,
    ...SettingsSagas,
    ...CommentSagas,
    ...LibrarySagas,
    ...RelationshipsSagas,
    ...NotificationsSagas,
    ...SearchSagas,
    ...CategoriesSagas,
  ]);
}
