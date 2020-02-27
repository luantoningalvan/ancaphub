import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followUser, unfollowUser } from '../../actions/userActions';

const useStyles = makeStyles(theme => ({
  button: {
    boxShadow: 'none'
  }
}));

function FollowButton({ fullWidth=true, ...props }) {
  const classes = useStyles()

  const followOrUnfollow = () => {
    if (props.auth.user.following.includes(props.profile._id)) {
      props.unfollowUser(props.profile._id)
    } else {
      props.followUser(props.profile._id)
    }
  }

  if (props.auth.isAuthenticated) {
    if (props.auth.user._id !== props.profile._id) {
      return (
        <Button
          variant={props.auth.user.following.includes(props.profile._id) ? 'contained' : 'outlined'}
          color="secondary"
          fullWidth={fullWidth}
          classes={{ contained: classes.button }}
          onClick={() => followOrUnfollow()}>
          {props.auth.user.following.includes(props.profile._id)
            ? 'Seguindo'
            : 'Seguir'}
        </Button>
      );
    } else {
      return (
        <Button fullWidth={fullWidth} disabled>Você</Button>
      )
    }

  } else {
    return (
      <></>
    )
  }
}
const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ followUser, unfollowUser }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowButton);
