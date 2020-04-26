import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Static
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';

// Components
import Scrollable from './Scrollable';
import ChatBubble from './ChatBubble';

// Wrap div for receiving messages input
const EnterMessageInputWrapper = styled.div`
  padding: 16px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.palette.border};

  & > div.messageInput {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid ${(props) => props.theme.palette.border};
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
  border-bottom:1px solid ${(props) => props.theme.palette.border};
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

const ChatInfo = ({ chat, showAvatar }) => (
  <ChatInfoWrapper>
    {showAvatar && (
    <div className="block">
      <img src={defaultProfilePicture} alt="Foto do perfil" />
    </div>
    )}
    <div className="block grow">
      <p>{chat.name}</p>
    </div>
  </ChatInfoWrapper>
);

const EnterMessageInput = () => (
  <EnterMessageInputWrapper>
    <div className="messageInput">
      <input type="text" placeholder="Digite sua mensagem" />
    </div>
  </EnterMessageInputWrapper>
);

const ChatWindow = ({ chat, showName, showAvatar, showHeader }) => (
  <Scrollable
    grow
    topContent={ showHeader ? <ChatInfo chat={chat} showAvatar={showAvatar} /> : null}
    bottomContent={<EnterMessageInput />}
    scrollableContent={chat.messages.map((message) => (
      <ChatBubble
        key={message.body}
        message={message}
        mine={message.sentByUser}
        showName={showName}
      />
    ))}
  />
);

const UserModelPropTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  bio: PropTypes.string,
  isVerified: PropTypes.bool,
};

const MessagePropTypes = PropTypes.shape({
  user: UserModelPropTypes,
  body: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

ChatWindow.propTypes = {
  chat: PropTypes.shape({
    messages: PropTypes.arrayOf(MessagePropTypes),
  }),
};

export default ChatWindow;
