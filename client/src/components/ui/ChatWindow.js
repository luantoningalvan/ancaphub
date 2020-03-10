import React from "react";
import styled from "styled-components";

// Static
import defaultProfilePicture from "../../assets/default-profile-picture.jpg";

// Components
import Scrollable from "./Scrollable";
import ChatBubble from "./ChatBubble";

// Wrap div for receiving messages input
const EnterMessageInputWrapper = styled.div`
  padding: 16px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #2f3749;

  & > div.messageInput {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid #2f3749;
    border-radius: 5px;

    & > i {
      padding: 4px 4px 4px 8px;
      svg {
        fill: white;
      }
    }

    & > input {
      border: none;
      width: 100%;
      font-family: Ubuntu;
      color: #eee;
      background: transparent;
      height: 50px;
      padding: 10px;
      outline: none;
      flex-grow: 1;

      &::placeholder {
        color: #eee;
        font-size: 12px;
      }
    }
  }
`;

const ChatInfoWrapper = styled.div`
  padding: 16px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom:1px solid #2f3749;
  background: rgba(0,0,0,.1);
  & > .block {
    padding: 16px 8px;
    display: inherit;
    flex-direction: column;
    & > img {
      width: 24px;
      height: 24px;
      border-radius: 100%;
    }
  }

  & > .grow {
    flex-grow: 1;
  }
`;

const ChatInfo = ({ chat }) => {
  return (
    <ChatInfoWrapper>
      <div className="block">
        <img src={defaultProfilePicture} alt="Foto do perfil" />
      </div>
      <div className="block grow">
        <p>{chat.name}</p>
      </div>
    </ChatInfoWrapper>
  );
};

const EnterMessageInput = () => {
  return (
    <EnterMessageInputWrapper>
      <div className="messageInput">
        <input type="text" placeholder="Digite sua mensagem" />
      </div>
    </EnterMessageInputWrapper>
  );
};

const ChatWindow = ({ chat }) => {
  return (
    <Scrollable
      grow={true}
      topContent={<ChatInfo chat={chat} />}
      bottomContent={<EnterMessageInput />}
      scrollableContent={chat.messages.map(message => (
        <ChatBubble
          key={message.body}
          message={message}
          sentByUser={message.sentByUser}
        />
      ))}
    />
  );
};

export default ChatWindow;
