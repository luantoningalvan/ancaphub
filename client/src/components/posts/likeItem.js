import React from 'react';

import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followUser, unfollowUser } from '../../actions/userActions';

import ShowName from '../profile/showName'
import FollowButton from '../profile/followButton'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

function LikeItem({ data, auth }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <ShowName user={data}/>
      <FollowButton auth={auth} profile={data} fullWidth={false}/>
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
