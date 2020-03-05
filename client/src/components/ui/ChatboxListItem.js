import React from "react";
import styled from "styled-components";
import defaultProfilePicture from "../../assets/default-profile-picture.jpg";

const ChatboxListItemWrapper = styled.div`
  display: flex;
  width: calc(20vw + 8px);
  transition: all ease-in-out 0.3s;
  padding: 8px;
  cursor: pointer;

  & > div.block {
    display: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 8px;
    & > img {
      width: 24px;
      height: 24px;
      border-radius: 100%;
    }

    & > p.chatUserName {
      font-size: 12px;
      font-weight: bold;
      line-height: 1em;
      margin-bottom: 0.5em;
      width: 100%;

      & > span.messageTime {
        &::before {
          content: "\u2022";
          margin: 0 0.5em;
        }
        line-height: 1em;
        font-size: 11px;
        color: ${props => props.theme.pallete.text.secondary};
      }
    }

    & > p.lastMessage {
      color: ${props => props.theme.pallete.text.secondary};
      font-size: 11px;
    }
  }

  &:hover {
    background: ${props => props.theme.pallete.background};
    box-shadow: inset 5px 0 0 ${props => props.theme.pallete.secondary};
  }
`;

const ChatboxListItem = ({ name, lastMessage }) => {
  return (
    <ChatboxListItemWrapper>
      <div className="block">
        <img src={defaultProfilePicture} alt="Foto do perfil" />
      </div>
      <div className="block">
        <p className="chatUserName">
          {name} <span className="messageTime">{lastMessage.time}</span>
        </p>
        <p className="lastMessage">{lastMessage.body}</p>
      </div>
    </ChatboxListItemWrapper>
  );
};

export default ChatboxListItem;
