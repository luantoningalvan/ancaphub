import React, { useEffect, useState } from 'react'
import UserAvatar from '../users/UserAvatar';
import UserName from '../users/UserName'
import styled from 'styled-components'
import Dropdown from "../../components/ui/Dropdown";
import IconButton from "../../components/ui/IconButton";
import Collapse from '../ui/Collapse'
import MdMore from "react-ionicons/lib/MdMore";
import CommentBox from './CommentBox'

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
        color: ${ props => props.theme.pallete.text.secondary};
        text-decoration: none;

        &:hover { text-decoration: underline; }
      } 
    }

    .actions {
      display:flex;
      flex-direction:column;
     justify-content:center;

      svg {
        fill: ${props => props.theme.pallete.text.secondary};
        height:20px;
        width:20px;
      }
    }
`


const SingleComment = ({ comment }) => {
  const [ responsesState, setResponsesState ] = useState(false)

  const handleResponse = () => {
    setResponsesState(!responsesState)
  }

  return (
    <SingleCommentStyle>
      <div className="teste">
      <UserAvatar avatar={comment.user.avatar} style={{ marginRight: 8 }} />
      <div className="comment-content">
        <UserName user={comment.user} fontSize={1} />
        <p className="comment-text">
          {" " + comment.content}
        </p>
        <ul className="date">
          <li><a href="#">Curtir</a></li>
          <li><a onClick={handleResponse}>Responder</a></li>
          <li><a href="#">há poucos segundos</a></li>
        </ul>
      </div>
      <div className="actions">
        <Dropdown placement="left-start" options={[{ text: "Edit", action: () => alert("Foo") }, { text: "Delete" }]}>
          <IconButton><MdMore /></IconButton>
        </Dropdown>
      </div>
      </div>
      <CommentBox expanded={responsesState} indent />
    </SingleCommentStyle>
  )
}

export default SingleComment