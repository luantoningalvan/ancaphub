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
import { getUserFollowers } from '../../actions/userActions';
import LoadContent from '../../components/loaders/loadContent'

function UserFollowers({getUserFollowers, followers, user}) {
  useEffect(() => getUserFollowers(user._id), [user._id, getUserFollowers]);

  return (
    <>
      <Title title={`${user.username} - Seguidores`} />

      <LoadContent loading={false}>
      <Grid container spacing={2}>
        {followers && !isEmpty(followers) ? (
          followers.map((user,key) => (
            <Grid item xs={6} md={4} lg={3} key={`follower-${key}`}>
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
      </LoadContent>
    </>
  );
}

const mapStateToProps = state => ({ followers: state.users.user.followers });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserFollowers }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFollowers);
