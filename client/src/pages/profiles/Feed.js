import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPostsRequest } from '../../actions/posts';
import PostForm from '../../components/posts/PostForm';
import PostCard from '../../components/posts/PostCard';
import ShowPosts from '../../components/posts/ShowPosts';
import { isEmpty } from 'lodash'

const Feed = ({user:userId}) => {
  const dipatch = useDispatch()
  const {items:posts,loading} = useSelector(state => state.posts);
  const auth = useSelector(state => state.auth);
  const verifyIfIsOwnProfile = auth.isAuthenticated && auth.user._id === userId

  useEffect(() => {
    dipatch(getUserPostsRequest(userId));
  }, [userId]);

  return (
    <>
    {verifyIfIsOwnProfile && (
      <PostForm />
    )}

    <div style={{width: '100%', marginTop:16}}>
      <ShowPosts posts={posts} loading={loading} />
    </div>
    </>
  );
};

export default memo(Feed)

