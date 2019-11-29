import React from 'react'
import {
  Typography
} from '@material-ui/core'

export default props => (
  <Typography variant="body2" color="textSecondary" component="p">
    {props.post.content}
  </Typography>
)
