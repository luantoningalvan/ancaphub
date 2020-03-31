import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultProfilePicture from '../../assets/default-profile-picture.jpg';

const ChatboxListItemWrapper = styled.div`
  display: flex;
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
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }

    & > p.chatUserName {
      font-size: 0.9em;
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
        font-size: 0.7em;
        color: ${(props) => props.theme.palette.text.secondary};
      }
    }

    & > p.lastMessage {
      color: ${(props) => props.theme.palette.text.secondary};
      font-size: 0.8em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    background: ${(props) => props.theme.palette.background};
    box-shadow: inset 5px 0 0 ${(props) => props.theme.palette.secondary};
  }
`;

const ChatboxListItem = ({ message }) => (
  <ChatboxListItemWrapper>
    <div className="block">
      <img src={message.user.avatar ? message.user.avatar : defaultProfilePicture} alt="Foto do perfil" />
    </div>
    <div className="block">
      <p className="chatUserName">
        {message.body}
        {' '}
        <span className="messageTime">{message.createdAt}</span>
      </p>
      <p className="lastMessage">{message.body}</p>
    </div>
  </ChatboxListItemWrapper>
);

ChatboxListItem.propTypes = {
  message: PropTypes.shape({
    user: PropTypes.object,
    body: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default ChatboxListItem;
