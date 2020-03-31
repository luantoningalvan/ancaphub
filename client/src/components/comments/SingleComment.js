import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MdMore from 'react-ionicons/lib/MdMore';
import DeleteIcon from 'react-ionicons/lib/IosRemoveCircleOutline';
import DocumentIcon from 'react-ionicons/lib/IosDocumentOutline';
import UserAvatar from '../users/UserAvatar';
import UserName from '../users/UserName';
import Dropdown from '../ui/Dropdown';
import DropdownListContainer from '../ui/DropdownListContainer';
import DropdownListItem from '../ui/DropdownListItem';
import IconButton from '../ui/IconButton';
import CommentBox from './CommentBox';

const SingleCommentStyle = styled.div`
.teste {
  display: flex;
  align-items: stretch;
  margin-bottom: 10px;
}


    .comment-content {
      background: rgba(0,0,0,0.05);
      padding: 10px;
      border-radius: 5px;
      display: flex;
      flex:1;
      flex-direction: column;
      align-items: flex-start;
    }

    .comment-text {
      padding-top:3px;
      margin:0;
      text-align: left;
      font-size:0.92em;
    }

    .date {
      font-size: 0.7em;
      margin-top:8px;
      
      li { 
        list-style: none; 
        display: inline-block;
        &:after {
          content: "·";
          margin:0px 5px;
        }

        &:last-child {
          &:after { content: "";margin:0;}
        }
      }
      
      a {
        color: ${(props) => props.theme.palette.text.secondary};
        text-decoration: none;

        &:hover { text-decoration: underline; }
      } 
    }

    .actions {
      display:flex;
      flex-direction:column;
     justify-content:center;

      svg {
        fill: ${(props) => props.theme.palette.text.secondary};
        height:20px;
        width:20px;
      }
    }
`;


const SingleComment = ({ comment }) => {
  const [responsesState, setResponsesState] = useState(false);

  const handleResponse = () => {
    setResponsesState(!responsesState);
  };

  return (
    <SingleCommentStyle>
      <div className="teste">
        <UserAvatar avatar={comment.user.avatar} style={{ marginRight: 8 }} />
        <div className="comment-content">
          <UserName user={comment.user} fontSize={1} />
          <p className="comment-text">
            {` ${comment.content}`}
          </p>
          <ul className="date">
            <li><a href="#">Curtir</a></li>
            <li><a onClick={handleResponse}>Responder</a></li>
            <li><a href="#">há poucos segundos</a></li>
          </ul>
        </div>
        <div className="actions">
          <Dropdown
            placement="left-start"
            toggle={<IconButton><MdMore /></IconButton>}
          >
            <DropdownListContainer>
              <DropdownListItem icon={<DocumentIcon />} onClick={() => alert('foo')}>Edit</DropdownListItem>
              <DropdownListItem icon={<DeleteIcon />}>Delete</DropdownListItem>
            </DropdownListContainer>
          </Dropdown>
        </div>
      </div>
      <CommentBox expanded={responsesState} indent />
    </SingleCommentStyle>
  );
};

export default SingleComment;
