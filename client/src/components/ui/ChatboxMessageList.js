import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Components
import SearchIcon from 'react-ionicons/lib/IosSearch';
import ChatboxListItem from './ChatboxListItem';
import Scrollable from './Scrollable';

// Icons

// Validation
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

const MessageSearchWrap = styled.div`
  padding: 16px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.border};
  background: rgba(0,0,0,.1);

  & > div.searchInput {
    display: flex;
    justify-content: center;
    align-items: center;
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
      font-family: Ubuntu;
      color: #eee;
      background: transparent;
      height: 50px;
      padding: 10px;
      outline: none;
      flex-grow: 1;

      &::placeholder {
        color: #eee;
        font-size: 1em;
      }
    }
  }
`;

const MessageSearch = () => (
  <MessageSearchWrap>
    <div className="searchInput">
      <i>
        <SearchIcon />
      </i>
      <input type="text" placeholder="Procurar mensagens" />
    </div>
  </MessageSearchWrap>
);

const ChatboxMessageList = ({ chats }) => (
  <>
    <Scrollable
      topContent={<MessageSearch />}
      scrollableContent={chats.map((chat, index) => (
        <ChatboxListItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          message={chat.messages[0]}
        />
      ))}
    />
  </>
);

ChatboxMessageList.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({
    messages: PropTypes.arrayOf(MessagePropTypes),
  })),
};

export default ChatboxMessageList;
