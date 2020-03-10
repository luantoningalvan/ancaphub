import React from "react";
import styled from "styled-components";
import Paper from "./Paper";
import ChatboxMessageList from "./ChatboxMessageList";
import ChatWindow from "./ChatWindow";

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
