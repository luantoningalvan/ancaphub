
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../users/UserAvatar';
import { addCommentRequest } from '../../actions/comments';

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

const CommentForm = ({ post, placeholder }) => {
  const [commentData, setCommentData] = useState({ content: '' });
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const handleChange = (e) => {
    setCommentData({ content: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (commentData.content !== '') {
        dispatch(addCommentRequest(commentData, post));
        setCommentData({ content: '' });
      }
    }
  };

  return (
    <CommentFormStyle>
      <UserAvatar user={authUser} style={{ marginRight: 10 }} />
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
