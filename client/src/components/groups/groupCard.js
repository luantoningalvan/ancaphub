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

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://static.wixstatic.com/media/b09f56_567339bf5c6746f189665eb24d6db0b5~mv2.jpg/v1/fit/w_300,h_300,al_c,q_80/file.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          Ancaps de POA
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