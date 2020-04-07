import {
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/posts';
import * as api from '../api/posts';

function* createPost(action) {
  try {
    const post = yield call(api.createPost, action.payload);
    yield put(actions.createPostSuccess(post.data));
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* getPosts() {
  try {
    const posts = yield call(api.getFeedPosts);
    yield put(actions.getPostsSuccess({ items: posts.data }));
  } catch (e) {
    yield put(actions.getPostsError({ errorMessage: e.message }));
  }
}

function* likePost(action) {
  try {
    const likedPost = yield call(() => api.likePost(action.payload));
    yield put(actions.likePostSuccess(likedPost.data));
  } catch (e) {
    yield put(actions.getPostsError({ errorMessage: e.message }));
  }
}


function* getUserPosts(action) {
  try {
    const posts = yield call(api.getUserPosts, action.payload);
    yield put(actions.getUserPostsSuccess({ userFeedItems: posts.data }));
  } catch (e) {
    yield put(actions.getUserPostsError({ errorMessage: e.message }));
  }
}

function* watchGetUserPostsRequest() {
  yield takeLatest(actions.Types.GET_USER_POSTS_REQUEST, getUserPosts);
}

function* watchGetPostsRequest() {
  yield takeEvery(actions.Types.GET_POSTS_REQUEST, getPosts);
}

function* watchCreatePostRequest() {
  yield takeLatest(actions.Types.CREATE_POST_REQUEST, createPost);
}

function* watchLikePostRequest() {
  yield takeLatest(actions.Types.LIKE_POST_REQUEST, likePost);
}

export default [
  fork(watchCreatePostRequest),
  fork(watchGetPostsRequest),
  fork(watchGetUserPostsRequest),
  fork(watchLikePostRequest)
];
