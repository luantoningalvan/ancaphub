import React from "react";
import styled from "styled-components";
import FollowButton from './FollowButton'
import defaultAvatar from "../../assets/default-profile-picture.jpg";
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

export const User = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.palette.border};
  padding-bottom: 15px;

  &:last-child {
    padding: 0;
    margin: 0;
    border: none;
  }

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

const UserList = ({ users }) => {
  return (
    <div style={{ width: "100%" }}>
      <ul>
        {!isEmpty(users) && users.map(user => (
          <User key={user.user._id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/${user.user._id}`}>
              <Avatar src={user.user.avatar && user.user.avatar !== "" ? user.user.avatar : defaultAvatar} />
              </Link>
              <div>
                <h4>{user.user.name}</h4>
                <span>{user.user.username}</span>
              </div>
            </div>
            <FollowButton user={user.user._id}/>
          </User>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
