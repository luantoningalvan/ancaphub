import React, { useEffect } from 'react';
import styled from 'styled-components';
import Collapse from '../ui/Collapse';
import CommentForm from './CommentForm';
import Comment from './SingleComment';
import { useDispatch, useSelector } from 'react-redux'
import { loadCommentsRequest } from '../../actions/comments'
const CommentBoxStyle = styled.div`
  margin: ${(props) => (props.indent ? '10px 0px 10px 43px' : 'none')}
`;

const CommentBox = ({ expanded, post, indent }) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments[post]);

  useEffect(() => {
    if(expanded) {
      dispatch(loadCommentsRequest(post));
    }
  }, [expanded]);

  return (
    <Collapse expanded={expanded}>
      <CommentBoxStyle indent={indent}>
        <CommentForm post={post} placeholder={indent ? 'Faça uma resposta' : 'Faça um comentário'} />
        <div style={{ padding: '0px 16px 16px 16px', textAlign: 'center' }}>
          {comments !== undefined && comments.map(comment => (
            <Comment comment={comment} post={post}/>
          ))}
        </div>
      </CommentBoxStyle>
    </Collapse>
  );
}

export default CommentBox;
