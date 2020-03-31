import React from 'react';
import styled from 'styled-components';

const BubbleWrap = styled.div`
  display: flex;
  justify-content: ${(props) => (props.sentByUser ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: calc(100% - 1em);
  padding: 16px 30px;
`;

const BubbleBody = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.sentByUser ? 'row-reverse' : 'row')};
  background-color: ${(props) => (props.sentByUser
    ? props.theme.palette.secondary
    : props.theme.palette.background)};
  padding: 16px;
  color: ${(props) => (props.sentByUser ? 'black' : '#ccc')};
  border-radius: 5px;
  border-bottom-right-radius: ${(props) => (props.sentByUser ? '0px' : '5px')};
  border-top-left-radius: ${(props) => (!props.sentByUser ? '0px' : '5px')};
  justify-content: flex-end;
  align-items: center;
  & > span.messageBody {
    display: inline-block;
    font-size: 0.9em;
    line-height: 1em;
  }

  & > span.messageTime {
    display: inline-block;
    font-size: 0.6em;
    line-height: 1em;
    margin: 0 1em;
    vertical-align: center;
  }
`;

// Message properties will be changed to match actual API response. This is only for prototyping
const ChatBubble = ({ message, sentByUser }) => (
  <BubbleWrap sentByUser={sentByUser}>
    <BubbleBody sentByUser={sentByUser}>
      <span className="messageBody">{message.body}</span>
      <span className="messageTime">{message.time}</span>
    </BubbleBody>
  </BubbleWrap>
);

export default ChatBubble;
