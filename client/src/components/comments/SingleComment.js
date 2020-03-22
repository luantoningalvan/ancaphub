import React from 'react'
import UserAvatar from '../users/UserAvatar';
import UserName from '../users/UserName'
import styled from 'styled-components'
import Dropdown from "../../components/ui/Dropdown";
import IconButton from "../../components/ui/IconButton";
import MdMore from "react-ionicons/lib/MdMore";

const SingleCommentStyle = styled.div`
    display: flex;
    align-items: stretch;
    margin-bottom: 10px;

    .comment-content {
      background: rgba(0,0,0,0.05);
      padding: 10px;
      border-radius: 5px;
      display: flex;
      flex:1;
      flex-direction: column;
      align-items: flex-start;
    }

    .commentText {
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
  return (
    <SingleCommentStyle>
      <UserAvatar avatar={comment.user.avatar} style={{ marginRight: 8 }} />
      <div className="comment-content">
        <UserName user={comment.user} fontSize={1} />
        <p className="commentText">
          {" " + comment.content}
        </p>
        <ul className="date">
          <li><a href="#">Curtir</a></li>
          <li><a href="#">Responder</a></li>
          <li><a href="#">há poucos segundos</a></li>
        </ul>
      </div>
      <div className="actions">
        <Dropdown placement="left-start" options={[{ text: "Edit", action: () => alert("Foo") }, { text: "Delete" }]}>
          <IconButton><MdMore /></IconButton>
        </Dropdown>
      </div>
    </SingleCommentStyle>
  )
}

export default SingleComment