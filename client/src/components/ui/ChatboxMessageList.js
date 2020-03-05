import React from "react";
import styled from "styled-components";

// Components
import ChatboxListItem from "./ChatboxListItem";
import Scrollable from "./Scrollable";

// Icons
import SearchIcon from "react-ionicons/lib/IosSearch";

const MessageSearchWrap = styled.div`
  padding: 16px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  & > div.searchInput {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
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
        font-size: 12px;
      }
    }
  }
`;

const MessageSearch = () => {
  return (
    <MessageSearchWrap>
      <div className="searchInput">
        <i>
          <SearchIcon />
        </i>
        <input type="text" placeholder="Procurar mensagens" />
      </div>
    </MessageSearchWrap>
  );
};

const ChatboxMessageList = ({ chats }) => {
  return (
    <>
      <Scrollable
        topContent={<MessageSearch />}
        scrollableContent={chats.map(chat => (
          <ChatboxListItem
            key={chat.name}
            name={chat.name}
            lastMessage={chat.lastMessage}
          />
        ))}
      />
    </>
  );
};

export default ChatboxMessageList;
