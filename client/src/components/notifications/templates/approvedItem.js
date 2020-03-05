import React from 'react'
import { ListItem, ListItemIcon, Avatar } from '@material-ui/core'
import {
  Check as CheckIcon
} from '@material-ui/icons'
import { Link } from 'react-router-dom'

export default ({ notification }) => (
  <ListItem component={Link} to={`/${notification.data.type}s/${notification.data._id}`} style={{color: 'inherit'}}>
    <ListItemIcon>
      <Avatar style={{ background: "#ffbc00" }}><CheckIcon /></Avatar>
    </ListItemIcon>
    <span>Sua contribuição <strong>'{notification.data.title}'</strong> foi aprovada.</span>
  </ListItem>
)