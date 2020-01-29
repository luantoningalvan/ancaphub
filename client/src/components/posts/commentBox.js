import React from 'react'
import {
  Box,
  Divider,
  Collapse
} from "@material-ui/core"
import CommentForm from './commentForm';
import Comment from './comment'

const CommentBox = ({ expanded, post }) => {
  return (
    <Collapse in={expanded}>
      <Divider />
      <CommentForm post={post._id} />
      <Box px={2} pb={2} textAlign="center">
        {post.comments.reverse().map((comment, index) => (
          <Comment comment={comment} key={`comment-${index}`}/>
        ))}
      </Box>
    </Collapse>
  )
}

export default CommentBox