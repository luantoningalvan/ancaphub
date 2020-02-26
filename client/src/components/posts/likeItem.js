import React from 'react';

import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followUser, unfollowUser } from '../../actions/userActions';

import FollowButton from '../profile/followButton'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
  }
}))

function LikeItem({ data, auth }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <h4>{data.username}</h4>
      <FollowButton auth={auth} profile={data}/>
    </div>
  );
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ followUser, unfollowUser }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeItem);
