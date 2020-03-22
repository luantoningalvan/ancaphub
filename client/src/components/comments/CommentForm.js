
import React, { useState } from 'react'
import UserAvatar from '../users/UserAvatar';
import styled from 'styled-components'

const CommentFormStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding:16px;
  `

const CommentInput = styled.input`
  padding: 15px;
  border-radius: 20px;
  background: transparent;
  outline:none;
  border: 1px solid #2f3749;
  flex-grow: 1;
  color: white;
`

const authUser = {
  avatar: ""
}

const CommentForm = ({ post }) => {
  const [commentData, setCommentData] = useState({ content: "" })

  const handleChange = (e) => {
    setCommentData({ content: e.target.value })
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (commentData.content !== "") {
        // addComment(post, commentData)
        setCommentData({ content: "" })
      }
    }
  }

  return (
    <CommentFormStyle>
      <UserAvatar avatar={authUser.avatar} style={{ marginRight: 10 }} />
      <CommentInput
        type="text"
        size="small"
        variant="filled"
        placeholder="Faça um comentário"
        color="secondary"
        onKeyPress={handleKeyPress}
        value={commentData.content}
        onChange={handleChange}
      />
    </CommentFormStyle>
  )
}

export default CommentForm