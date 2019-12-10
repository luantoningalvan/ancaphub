import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import defaultCover from '../../assets/images/default-thumbnail.jpg'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default props => {
  const classes = useStyles()
  const { _id, name, cover } = props.group
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={cover ? cover.url : defaultCover}
        title="Contemplative Reptile"
        component={Link}
        to={`/groups/${_id}`}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
          </Typography>
      </CardContent>
      <CardActions style={{ padding: '0px 16px 16px 16px' }}>
        <Button size="small" color="secondary" variant="contained">
          Entrou
        </Button>
      </CardActions>
    </Card>
  )
}