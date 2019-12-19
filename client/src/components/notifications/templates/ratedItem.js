import React from 'react'
import { ListItemIcon, Badge, Avatar } from '@material-ui/core'
import {
  RateReview as RateIcon,
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
        badgeContent={<SmallAvatar style={{ background: "#ffbc00" }}><RateIcon fontSize="inherit" style={{ fontSize: '12px' }} /></SmallAvatar>}
      >
        <ProfilePicture avatar={notification.sender.avatar} height="40px" width="40px" />
      </Badge>
    </ListItemIcon>
    <span><strong>{notification.sender.username}</strong> avaliou seu item <strong>'{notification.data.title}'</strong></span>
  </>
)