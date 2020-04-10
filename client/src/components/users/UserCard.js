import React from 'react'
import styled from 'styled-components'
import Paper from '../ui/Paper'
import FollowButton from './FollowButton'
import UserAvatar from './UserAvatar'
import UserName from './UserName'

const UserCard = styled(Paper)`
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  width:100%; 

  .avatar, span { margin-bottom: 16px;}

  a { display: block; }
`

export default ({user}) => {
  return (
    <UserCard padding >
      <div className="avatar" >
      <UserAvatar avatar={user.avatar} size="80"/>
      </div>
      <UserName user={user} />
      <span>@{user.username}</span>
      <FollowButton user={user._id}/>
    </UserCard>
  )
}