import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ProfilePicture from '../../components/profilePicture'
import MaterialLink from '@material-ui/core/Link';
import FollowButton from './profile/followButton'
import { Link } from 'react-router-dom'

export default function UserCard(props) {
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  console.log(props.user)
  return (
    <Paper>
      <Box p={2}>
        <MaterialLink underline="none" component={AdapterLink} to={`/usuario/${props.user._id}`}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
            <ProfilePicture avatar={props.user.avatar} width="70%" height="auto" style={{ marginBottom: '8px' }} />
            <Typography variant="subtitle1">
              {props.user.name}
            </Typography>
          </Box>
        </MaterialLink>
        <FollowButton profile={props.user} />
      </Box>
    </Paper>
  );
}
