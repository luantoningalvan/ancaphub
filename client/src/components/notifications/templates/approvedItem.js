import React from 'react'
import { ListItemIcon, Avatar } from '@material-ui/core'
import {
  Check as CheckIcon
} from '@material-ui/icons'

export default ({ notification }) => (
  <>
    <ListItemIcon>
      <Avatar style={{ background: "#ffbc00" }}><CheckIcon /></Avatar>
    </ListItemIcon>
    <span>Sua contribuição <strong>'{notification.data.title}'</strong> foi aprovada.</span>
  </>
)