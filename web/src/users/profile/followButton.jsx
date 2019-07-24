import React from 'react'
import Button from '@material-ui/core/Button';
import FolowIcon from '@material-ui/icons/PersonAdd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { followUser } from '../userActions'

function FollowButton(props) {
  return (
    <Button variant="outlined" fullWidth onClick={() => props.followUser(props.profile._id)}>
      <FolowIcon style={{ marginRight: '10px' }} />
      {props.profile.followers.includes(props.user) ? "Deixar de seguir" : "Seguir"}
    </Button>
  )
}
const mapStateToProps = state => ({ user: state.auth.user._id })
const mapDispatchToProps = dispatch => bindActionCreators({ followUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton)