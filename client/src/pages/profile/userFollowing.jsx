import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Grid
} from '@material-ui/core';
import isEmpty from 'is-empty';
import Title from '../../components/template/titleComponent'
import UserCard from '../../components/profile/userCard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserFollowing } from '../../actions/userActions';

function UserFollowing(props) {
  useEffect(() => props.getUserFollowing(props.user._id), [props.user._id]);

  return (
    <>
      <Title title={`${props.user.name} - Seguindo`} />
      <Grid container spacing={2}>
        {props.following && !isEmpty(props.following) ? (
          props.following.map(user => (
            <Grid item xs={6} md={4} lg={3} key={`following-${user._id}`}>
              <UserCard user={user} />
            </Grid>
          ))
        ) : (
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>Esse usuário não segue ninguém.</Box>
              </Paper>
            </Grid>
          )}
      </Grid>
    </>
  );
}

const mapStateToProps = state => ({ following: state.users.user.following });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserFollowing }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFollowing);
