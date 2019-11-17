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

function UserFollowers(props) {
  useEffect(() => props.getUserFollowers(props.user._id), [props.user._id]);

  return (
    <>
      <Title title={`${props.user.name} - Seguidores`} />
      <Grid container spacing={2}>
        {props.followers && !isEmpty(props.followers) ? (
          props.followers.map(user => (
            <Grid item xs={6} md={4} lg={3} key={`follower-${user._id}`}>
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
