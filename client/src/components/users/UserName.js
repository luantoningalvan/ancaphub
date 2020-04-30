import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const UserNameStyle = styled(Link)`
  font-weight: bold;
  color: inherit;
  text-decoration: none;
  font-size: ${(props) => props.fontSize || 15}em;

  .verifiedUser {
    background: ${(props) => props.theme.palette.secondary};
    border-radius: 15px;
    color: white;
    padding: 5px 10px;
    margin-right: 5px;
  }
`;

const UserName = ({ user, fontSize }) => (
  <UserNameStyle
    title={user.isVerified && <FormattedMessage id="common.verified" />}
    to={`/${user._id}`}
    className={clsx({ verifiedUser: user.isVerified })}
    fontSize={fontSize}
  >
    {user.name}
  </UserNameStyle>
);

UserName.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    bio: PropTypes.string,
    isVerified: PropTypes.bool,
  }),
  fontSize: PropTypes.number,
};

UserName.defaultProps = {
  fontSize: 1,
};

export default UserName;
