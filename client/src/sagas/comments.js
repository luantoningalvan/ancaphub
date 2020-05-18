import {
  select,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/comments';
import { addAlert } from '../actions/alerts';
import * as api from '../api/comments';

function* loadComments({ payload }) {
  try {
    const comments = yield call(api.getComments, payload);
    yield put(actions.loadCommentsSuccess({ id: payload, data: comments.data }));
  } catch (e) {
    yield put(addAlert('error', e.message));
  }
}

function* addComment({ payload }) {
  try {
    const comment = yield call(api.createComment, payload);
    const state = yield select();

    const data = {
      postId: payload.postId,
      user: state.auth.user,
      data: comment.data,
      content: payload.comment.content,
    };
    yield put(actions.addCommentSuccess(data));
  } catch (e) {
    yield put(addAlert('error', e.message));
  }
}

function* deleteComment({ payload }) {
  try {
    yield call(api.deleteComment, payload);
    yield put(actions.deleteCommentSuccess(payload));
  } catch (e) {
    yield put(addAlert('error', e.message));
  }
}

function* watchLoadComments() {
  yield takeLatest(actions.Types.LOAD_COMMENTS_REQUEST, loadComments);
}

function* watchAddComment() {
  yield takeLatest(actions.Types.ADD_COMMENT_REQUEST, addComment);
}

function* watchDeleteComment() {
  yield takeLatest(actions.Types.DELETE_COMMENT_REQUEST, deleteComment);
}

export default [
  fork(watchLoadComments),
  fork(watchAddComment),
  fork(watchDeleteComment),
];
