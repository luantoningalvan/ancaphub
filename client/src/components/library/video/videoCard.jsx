import React from 'react';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';
import { PlayArrow as VideoIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../../../assets/images/default-thumbnail.jpg'
import AddToLibrary from '../addToLibrary';
import AddBookmark from '../addBookmark';

const useStyles = makeStyles(theme => ({
  media: {
    height: 200
  },
  type: {
    margin: theme.spacing(1),
    borderRadius: '5px',
    color: 'white'
  }
}));

export default function VideoCard({video, location}) {
  const classes = useStyles();
  const { _id, title, cover, author, inLibrary, hasSaved } = video;

  return (
    <Card>
      <CardActionArea component={Link} to={`/videos/${_id}`}>
        <CardMedia
          className={classes.media}
          image={cover ? cover.url : defaultThumbnail}
          title={`Capa do vídeo ${title}`}>
          <VideoIcon className={classes.type} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap style={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography className={classes.pos} variant="subtitle1">
            {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddToLibrary item={{_id, inLibrary, location}} />
        <AddBookmark item={{_id, hasSaved, location}}  />
      </CardActions>
    </Card>
  );
}
