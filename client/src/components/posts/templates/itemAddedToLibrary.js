import React from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import striptags from 'striptags'

export default props => {
  const { _id, type, cover, title, description } = props.post.extraFields
  return (
    <Card>
      <CardActionArea
        component={Link}
        to={`/${type}s/${ _id}`}>
        <CardMedia
          component="img"
          height="240"
          image={cover}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p">
            {`${striptags(
              description.substring(0, 240)
            )}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}



