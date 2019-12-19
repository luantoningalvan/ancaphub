import React from 'react'
import { ListItemIcon, Badge, Avatar } from '@material-ui/core'
import {
  PersonAdd as FollowIcon,
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import ProfilePicture from '../../profile/profilePicture'

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: `${theme.palette.secondary}`
  },
}))(Avatar);

export default ({ notification }) => (
  <>
    <ListItemIcon>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<SmallAvatar style={{ background: "#ffbc00" }}><FollowIcon fontSize="inherit" style={{ fontSize: '12px' }} /></SmallAvatar>}
      >
        <ProfilePicture avatar={notification.sender.avatar} height="40px" width="40px" />
      </Badge>
    </ListItemIcon>
    <span><strong>{notification.sender.username}</strong> começou a seguir você</span>
  </>
)