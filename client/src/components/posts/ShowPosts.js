import React from 'react';
import PostCard from './PostCard';
import LoadContent from '../ui/LoadContent';

export default ({ posts, loading }) => (
  <LoadContent loading={loading}>
    {Object.values(posts).map((item) => (
      <PostCard data={item} key={item._id} />
    ))}
  </LoadContent>
);
