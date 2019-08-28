import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { followUser } from '../userActions'

function FollowButton(props) {

  if (props.auth.isAuthenticated && props.auth.user._id != props.profile._id) {
    return (
      <Button variant="outlined" fullWidth onClick={() => props.followUser(props.profile._id)}>
        {props.auth.user.following.includes(props.profile._id) ? "Deixar de seguir" : "Seguir"}
      </Button>
    )
  } else {
    return (<></>)
  }
}
const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ followUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton)