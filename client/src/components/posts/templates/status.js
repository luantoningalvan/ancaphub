import React from 'react'
import {
  Typography
} from '@material-ui/core'

export default props => (
  <Typography variant="body2" style={{fontSize: '0.91rem'}} color="textSecondary" component="p">
    {props.post.content}
  </Typography>
)
