
import React, { useState } from 'react';
import styled from 'styled-components';
import UserAvatar from '../users/UserAvatar';

const CommentFormStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding:16px;
  `;

const CommentInput = styled.input`
  padding: 15px;
  border-radius: 20px;
  background: transparent;
  outline:none;
  border: 1px solid ${(props) => props.theme.palette.border};
  flex-grow: 1;
  color: white;
`;

const authUser = {
  avatar: '',
};

// eslint-disable-next-line no-unused-vars
const CommentForm = ({ post, placeholder }) => {
  const [commentData, setCommentData] = useState({ content: '' });

  const handleChange = (e) => {
    setCommentData({ content: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (commentData.content !== '') {
        // addComment(post, commentData)
        setCommentData({ content: '' });
      }
    }
  };

  return (
    <CommentFormStyle>
      <UserAvatar avatar={authUser.avatar} style={{ marginRight: 10 }} />
      <CommentInput
        type="text"
        size="small"
        variant="filled"
        placeholder={placeholder}
        color="secondary"
        onKeyPress={handleKeyPress}
        value={commentData.content}
        onChange={handleChange}
      />
    </CommentFormStyle>
  );
};

export default CommentForm;
