import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Link as MaterialLink
} from '@material-ui/core';
import { Room as PinIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import ProfilePicture from './profilePicture';
import FollowButton from './followButton';

const useStyles = makeStyles(theme => ({
  name: {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: `${theme.typography.subtitle1.lineHeight}em`
  }
}));

export default function UserCard(props) {
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));

  const classes = useStyles()

  return (
    <Paper>
      <Box p={2}>
        <MaterialLink
          underline="none"
          component={AdapterLink}
          to={`/${props.user._id}`}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
            <ProfilePicture
              avatar={props.user.avatar}
              width="70%"
              height="auto"
            />
            <Typography variant="h6" className={classes.name}>{props.user.name}</Typography>
            <Typography variant="body2" gutterBottom style={{color: "#bbb"}}>@{props.user.username}</Typography>

            {props.user.distance && (
              <Box
                display="flex"
                alignItems="center"
                style={{ color: '#e4c21e', margin: '4px 0px' }}>
                <PinIcon />
                <span>{props.user.distance}km</span>
              </Box>
            )}
          </Box>
        </MaterialLink>
        <FollowButton profile={props.user} />
      </Box>
    </Paper>
  );
}
