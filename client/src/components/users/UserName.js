import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx'
import styled from 'styled-components'

const UserNameStyle = styled(Link)`
  font-weight: bold;
  color: inherit;
  text-decoration: none;
  font-size: ${props => props.fontSize || 15}em;

  .verifiedUser {
    background: ${props => props.theme.palette.secondary};
    border-radius: 15px;
    color: white;
    padding: 5px 10px;
    margin-right: 5px;
  }
`

export default ({ user, fontSize }) => {

  return (
    <UserNameStyle
      title={user.isVerified && "Verificado"}
      to={`/${user._id}`}
      className={clsx({ "verifiedUser": user.isVerified })}
      fontSize={fontSize}
    >
      {user.name}
    </UserNameStyle>
  )
};