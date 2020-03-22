import React from 'react'
import Collapse from '../ui/Collapse'
import CommentForm from './CommentForm';
import Comment from './SingleComment'
import styled from 'styled-components'

const comments = [
  {
    user: {
      _id: '1',
      avatar: "",
      name: "Nome Teste",
      username: 'usertest'
    },
    content: "Comentário teste"
  },
  {
    user: {
      _id: '2',
      avatar: "",
      name: "Luan",
      username: 'luan'
    },
    content: "Quis duis laborum adipisicing laboris et in ipsum cillum cillum id est amet nulla. Ut esse amet id dolor officia ipsum ipsum cillum eiusmod est nostrud. Irure eu aute deserunt elit culpa amet. Mollit mollit aliquip fugiat dolor Lorem consequat quis enim ullamco. Esse enim ex enim labore nisi nostrud ex duis deserunt pariatur ipsum ipsum elit mollit. Ad eu esse nostrud labore adipisicing officia. Incididunt est fugiat mollit consequat"
  }
]

const CommentBoxStyle = styled.div`
  border-top: 1px solid #2f3749;
  background: rgba(0,0,0,.1);
`

const CommentBox = ({ expanded, post }) => {
  return (
    <Collapse expanded={expanded}>
      <CommentBoxStyle>
        <CommentForm post={post} />
        <div style={{ padding: '0px 16px 16px 16px', textAlign: 'center' }}>
          {comments.map((comment, index) => (
            <Comment comment={comment} key={`comment-${index}`} />
          ))}
        </div>
      </CommentBoxStyle>
    </Collapse>
  )
}

export default CommentBox