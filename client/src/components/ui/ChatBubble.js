import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReplyIconNormal from 'react-ionicons/lib/MdShareAlt';

const MessagePropTypes = PropTypes.shape({
  body: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

const ReplyIcon = () => <ReplyIconNormal color="white" style={{ transform: 'scale(-1, 1)', marginRight: 8 }} />;

const BubbleWrap = styled.div`
  display: flex;
  justify-content: ${(props) => (props.mine ? 'flex-end' : 'flex-start')};
  align-items: center;
  width: 100%;
`;

const BubbleBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.mine
    ? props.theme.palette.secondary
    : props.theme.palette.paperDark)};
  padding: 16px;
  color: ${(props) => (props.mine ? 'black' : '#ccc')};
  border-radius: 5px;
  border-bottom-right-radius: ${(props) => (props.mine ? '0px' : '5px')};
  border-top-left-radius: ${(props) => (!props.mine ? '0px' : '5px')};
  justify-content: flex-end;
  & > span.messageBody {
    display: inline-block;
    font-size: 0.9em;
    line-height: 1em;
  }

  span.messageSenderName {
    font-size: 0.75em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  & > div.answeringTo {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, .2);
    padding: .25em;
    border-radius: 5px;
    margin: .25em 0;
  }

  & > div.messageContent {
    & > span.messageTime {
      display: inline-block;
      font-size: 0.6em;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 1em;
      margin: 0 1em;
      vertical-align: center;
    }
    & > div.messageContent {
      display: flex;
      flex-direction: ${(props) => (props.mine ? 'row-reverse' : 'row')};
    }
  }

`;

// Message properties will be changed to match actual API response. This is only for prototyping
const ChatBubble = ({
  message, mine, showName, answeringTo,
}) => (
  <BubbleWrap mine={mine}>
    <BubbleBody mine={mine}>
      { showName && <span className="messageSenderName">{message.user.name}</span> }
      {answeringTo && (
        <div className="answeringTo">
          <ReplyIcon />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {showName && <span className="messageSenderName">{answeringTo.user.name}</span>}
            <span className="messageBody">{answeringTo.body}</span>
          </div>
        </div>
      )}
      <div className="messageContent">
        <span className="messageBody">{message.body}</span>
        <span className="messageTime">{message.createdAt}</span>
      </div>
    </BubbleBody>
  </BubbleWrap>
);

ChatBubble.propTypes = {
  message: MessagePropTypes,
  mine: PropTypes.bool,
};

ChatBubble.defaultProps = {
  mine: false,
};

export default ChatBubble;
