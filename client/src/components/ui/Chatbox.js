import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paper from './Paper';
import ChatboxMessageList from './ChatboxMessageList';
import ChatWindow from './ChatWindow';

const ChatboxWrapper = styled.div`
  display: flex;
  flex: 1;
  border-radius: 5px;
  padding: 1em 0px;
  height: calc(100vh - 64px);
  & > .paper {
    padding: 0 !important;
    display: flex;
    width: calc(100vw - 64px);
  }
`;

const Chatbox = ({ chats, currentChat }) => (
  <ChatboxWrapper>
    <Paper className="paper">
      <ChatboxMessageList chats={chats} />
      <ChatWindow chat={currentChat} />
    </Paper>
  </ChatboxWrapper>
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

Chatbox.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({
    messages: PropTypes.arrayOf(MessagePropTypes),
  })),
  currentChat: PropTypes.arrayOf(MessagePropTypes),
};

export default Chatbox;
