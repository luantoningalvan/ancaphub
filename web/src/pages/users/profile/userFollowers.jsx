import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ProfilePicture from '../../../components/profilePicture';
import MaterialLink from '@material-ui/core/Link';
import UserCard from '../userCard';
import isEmpty from 'is-empty';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserFollowers } from '../userActions';

function UserFollowers(props) {
  useEffect(() => props.getUserFollowers(props.user._id), [props.user._id]);

  return (
    <Grid container spacing={2}>
      {props.followers && !isEmpty(props.followers) ? (
        props.followers.map(user => (
          <Grid item xs={3} key={`follower-${user._id}`}>
            <UserCard user={user} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Paper>
            <Box p={2}>Esse usuário não possui nenhum seguidor.</Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

const mapStateToProps = state => ({ followers: state.users.user.followers });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserFollowers }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFollowers);
