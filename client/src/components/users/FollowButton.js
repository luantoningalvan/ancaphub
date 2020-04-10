import React from 'react';
import Button from '../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { followUserRequest, unfollowUserRequest } from '../../actions/relationships';

export default ({user}) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.relationships[user])
  const auth = useSelector(state => state.auth)
  const verifyIfIsOwnProfile = auth.isAuthenticated && auth.user._id === user
  
  const handleFollow = () => {
    dispatch(followUserRequest(user))
  }

  const handleUnfollow = () => {
    dispatch(unfollowUserRequest(user))
  }
  
  if (verifyIfIsOwnProfile) {
    return null
  } else {
    return (
      <Button
        color="primary"
        size="small"
        variant={state.following ? "normal" : "outlined"}
        onClick={state.following ? handleUnfollow : handleFollow}
      >
        {state.following ? "Seguindo" : "Seguir"}
      </Button>
    )
  }
}