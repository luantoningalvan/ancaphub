import React from 'react'
import {
  Favorite as RemoveLikeIcon,
  FavoriteBorder as LikeIcon
} from '@material-ui/icons'
import { Button } from '@material-ui/core'

export default ({post, action}) => {
  const likePost = () => {
    action(post._id)
  }

  return (
    <Button 
    startIcon={post.hasLiked ? <RemoveLikeIcon color="secondary"/> : <LikeIcon />}
    onClick={likePost}
    >
    Curtir
  </Button>
  )
}