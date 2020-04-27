import React from 'react';
import styled from 'styled-components';
import DistanceIcon from 'react-ionicons/lib/IosPin';
import Paper from '../ui/Paper';
import FollowButton from './FollowButton';
import UserAvatar from './UserAvatar';
import UserName from './UserName';

const UserCard = styled(Paper)`
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  width:100%; 

  .avatar, .username, .distance { margin-bottom: 8px;}
  .username { 
    color: ${(props) => props.theme.palette.text.secondary};
    font-size:0.8em;
    line-height:100%;
    margin-bottom: 16px;
  }

  a { display: block; }

  .distance{
    display:flex;
    alig-items:center;
    margin-bottom:8px;

    svg {
      fill: ${(props) => props.theme.palette.secondary}
    }
  }
`;

export default ({ user }) => (
  <UserCard padding>
    <div className="avatar">
      <UserAvatar user={user} size="80" />
    </div>
    <UserName user={user} />
    <span className="username">
      @
      {user.username}
    </span>
    {(user.dist || user.dist === 0) && (
    <div className="distance">
      <DistanceIcon />
      <span>{`${(user.dist / 1000).toFixed(0)} Km`}</span>
    </div>
    )}
    <FollowButton user={user._id} />
  </UserCard>
);
