import React from 'react';

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followUser, unfollowUser } from '../../actions/userActions';

import defaultProfilePicture from '../../assets/images/defaultProfilePicture.png';
import ShowName from '../profile/showName'
import FollowButton from '../profile/followButton'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0 10px 0'
  },
  picture: {
    marginRight: 10
  }
}))

function LikeItem({ data, auth, ...props }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <span style={{display: 'flex', alignItems: 'center'}}>
      {data.avatar && data.avatar !== '' ? (
          <Avatar
            src={data.avatar}
            alt={data.username}
            className={classes.picture}
            {...props}
          />
        ) : (
            <Avatar
              src={defaultProfilePicture}
              alt="Foto de perfil genérica"
              className={classes.picture}
              {...props}
            />
          )}
        <ShowName user={data}/>
      </span>
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
