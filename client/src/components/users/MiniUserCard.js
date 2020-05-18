import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Button from '../ui/Button';
import defaultAvatar from '../../assets/default-profile-picture.jpg';

export const User = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background: ${(props) => props.theme.palette.paperDark};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);

  h4 {
    margin-bottom: 5px;
    font-size: 1em;
    line-height: 100%;
  }
  span {
    color: ${(props) => props.theme.palette.text.secondary};
    font-size: 0.9em;
    line-height: 100%;
    font-weight: lighter;
  }
`;
const Avatar = styled.div`
  height: 42px;
  width: 42px;
  overflow: hidden;
  border-radius: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  margin-right: 10px;
`;

const MiniUserCard = ({ user }) => (
  <User>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={user.avatar !== '' ? user.avatar : defaultAvatar} />
      <div>
        <h4>{user.name}</h4>
        <span>{user.username}</span>
      </div>
    </div>
    <Button variant="outlined" size="small" color="primary">
      <FormattedMessage id="common.follow" />
    </Button>
  </User>
);

export default MiniUserCard;
