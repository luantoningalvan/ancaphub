import React from 'react'
import ProfilePicture from './profilePicture';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Box
} from '@material-ui/core';

export default props => (
  <Box mt={2}>
    <span>Enviado por</span>
    <Link
      component={RouterLink}
      to={`/${props.user._id}`}
      underline="none"
      color="textPrimary">
      <Box display="flex" alignItems="center" mt={1}>
        <ProfilePicture
          avatar={props.user.avatar}
          width="40px"
          height="40px"
        />
        <span style={{ paddingLeft: '10px' }}>@{props.user.name}</span>
      </Box>
    </Link>
  </Box>
)