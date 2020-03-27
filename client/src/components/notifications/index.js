import React from 'react';
import { FormattedMessage } from "react-intl";
import styled from 'styled-components'

import LikeIcon from 'react-ionicons/lib/IosThumbsUp'
import CommentIcon from 'react-ionicons/lib/IosText'
import CheckIcon from 'react-ionicons/lib/IosCheckmark'
import RateIcon from 'react-ionicons/lib/IosStar'
import ShareIcon from 'react-ionicons/lib/IosRedo'
import FollowIcon from 'react-ionicons/lib/IosPersonAdd'

const icons = {
  comment_liked: () => LikeIcon,
  comment_replied: () => CommentIcon,
  item_approved: () => CheckIcon,
  item_rated: () => RateIcon,
  post_commented: () => CommentIcon,
  post_liked: () => LikeIcon,
  post_shared: () => ShareIcon,
  user_followed: () => FollowIcon,
}

const Notification = styled.li`
  padding: 8px 16px;
  display: flex;
  align-items:center;
  cursor:pointer; 
  
  &:hover {
    background: rgba(0,0,0,0.1);
  }

  img {
    height:56px;
    width:56px;
    border-radius:100%
  }

  .thumb{
    position: relative;
    height: 64px;
    width:64px;
    margin-right:16px;
  }

  .icon {
    height: 28px;
    width: 28px;
    background: ${props => props.theme.pallete.background};
    border-radius:100%;
    position:absolute;
    bottom: 0px;
    right: 0px;
    padding:4px;

    svg {
      fill: ${props => props.theme.pallete.secondary};
      height: 20px;
      width: 20px;
    }
  }

  .message{
    display:block;
    font-size:1.1em;
  }

  .date{
    font-size:0.9em;
    color: ${props => props.theme.pallete.text.secondary};
  }
`

export default ({ notification }) => {
  const Icon = icons[notification.type]()
  return (
  <Notification>
    <div className="thumb">
      <img src={notification.data.avatar} />
      <div className="icon"><Icon /></div>
    </div>
    <div>
      <span className="message">
        <FormattedMessage
          id={`componentes.notifications.${notification.type}`}
          values={{
            ...notification.data,
            strong: (...chunks) => <strong>{chunks}</strong>,
          }} />
      </span>
      <span className="date">{notification.date}</span>
    </div>
  </Notification>
)
}