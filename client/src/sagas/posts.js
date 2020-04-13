import {
  takeEvery,
  putResolve,
  takeLatest,
  call,
  fork,
  put,
} from 'redux-saga/effects';

import * as actions from '../actions/posts';
import * as api from '../api/posts';
import { getUsersCount } from '../actions/users';
import { getUsersRelationsips } from '../actions/relationships';

function* createPost(action) {
  try {
    const post = yield call(api.createPost, action.payload);
    yield put(actions.createPostSuccess(post.data));
  } catch (e) {
    yield put(actions.usersError({ errorMessage: e.message }));
  }
}

function* deletePost(action) {
  try {
    yield call(api.deletePost, action.payload);
    yield put(actions.deletePostSuccess(action.payload));
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

function* getPostLikes(action) {
  try {
    const post = yield call(() => api.getLikes(action.payload));
    yield putResolve(getUsersCount(post.data.likes));
    yield putResolve(getUsersRelationsips(post.data.likes));
    yield put(actions.getPostLikesSuccess(post.data));
  } catch (e) {
    yield put(actions.getPostsError({ errorMessage: e.message }));
  }
}

function* votePostPoll(action) {
  try {
    const { postId, pollId, vote } = action.payload;
    const data = yield call(api.votePostPoll, { pollId, option: vote });
    yield put(actions.votePostPollSuccess({ postId, data: data.data }));
  } catch (e) {
    yield put(actions.pollError({ errorMessage: e.message }));
  }
}

function* getUserPosts(action) {
  try {
    const posts = yield call(api.getUserPosts, action.payload);
    yield put(actions.getUserPostsSuccess(posts.data));
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

function* watchGetLikesRequest() {
  yield takeLatest(actions.Types.GET_POST_LIKE_REQUEST, getPostLikes);
}

function* watchVotePostPollRequest() {
  yield takeLatest(actions.Types.VOTE_POST_POLL_REQUEST, votePostPoll);
}

function* watchDeletePostRequest() {
  yield takeLatest(actions.Types.DELETE_POST_REQUEST, deletePost);
}

export default [
  fork(watchCreatePostRequest),
  fork(watchGetPostsRequest),
  fork(watchGetUserPostsRequest),
  fork(watchLikePostRequest),
  fork(watchGetLikesRequest),
  fork(watchVotePostPollRequest),
  fork(watchDeletePostRequest),
];
