import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPostsRequest } from '../../actions/posts';
import PostForm from '../../components/posts/PostForm';
import ShowPosts from '../../components/posts/ShowPosts';

const Feed = ({ user: userId }) => {
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);
  const verifyIfIsOwnProfile = auth.isAuthenticated && auth.user._id === userId;

  useEffect(() => {
    dispatch(getUserPostsRequest(userId));
  }, [dispatch, userId]);

  return (
    <>
      {verifyIfIsOwnProfile && (
      <PostForm />
      )}

      <div style={{ width: '100%', marginTop: 16 }}>
        <ShowPosts posts={posts} loading={loading} />
      </div>
    </>
  );
};

export default memo(Feed);
