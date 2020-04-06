import React from 'react'
import PostCard from './PostCard'

export default ({posts}) => (
  <>
    {Object.values(posts).map((item) => (
      <PostCard data={item} key={item._id} />
    ))}
  </>
)