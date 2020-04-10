import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPostsRequest } from '../../actions/posts';
import PostForm from '../../components/posts/PostForm';
import PostCard from '../../components/posts/PostCard';
import { isEmpty } from 'lodash'

const Feed = ({user:userId}) => {
  const dipatch = useDispatch()
  const {posts,loadingPosts} = useSelector(state => state.profile);
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

    {!loadingPosts ? (
      <div>
        {!isEmpty(posts) && posts.map(post => (
          <PostCard data={post}/>
        ))}
      </div>
    ) : (
      <p>Carregando</p>
    )}
    </>
  );
};

export default memo(Feed)

