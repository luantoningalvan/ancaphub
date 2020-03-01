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
import LoadContent from '../../components/loaders/loadContent'

function UserFollowing({getUserFollowing, following, user}) {
  useEffect(() => getUserFollowing(user._id), [user._id, getUserFollowing]);

  return (
    <>
      <Title title={`${user.username} - Seguindo`} />

      <LoadContent loading={false}>
      <Grid container spacing={2}>
        {following && !isEmpty(following) ? (
          following.map((user, key) => (
            <Grid item xs={6} md={4} lg={3} key={`following-${key}`}>
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
      </LoadContent>
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
