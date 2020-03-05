import React from "react";
import styled from "styled-components";
import Paper from "./Paper";
import ChatboxMessageList from "./ChatboxMessageList";
import ChatWindow from "./ChatWindow";

const ChatboxWrapper = styled.div`
  display: flex;
  flex: 1;
  border-radius: 5px;
  margin-top: 3em;
  & > .paper {
    padding: 0 !important;
    display: flex;
    width: calc(100vw - 64px);
    height: 65vh;
  }
`;

const Chatbox = ({ chats, currentChat }) => {
  return (
    <ChatboxWrapper>
      <Paper className="paper">
        <ChatboxMessageList chats={chats} />
        <ChatWindow chat={currentChat} />
      </Paper>
    </ChatboxWrapper>
  );
};

export default Chatbox;
