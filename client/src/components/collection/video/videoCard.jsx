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
import AddToCollection from '../addItemToCollection';
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

export default function VideoCard(props) {
  const classes = useStyles();
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const { video } = props;

  return (
    <Card>
      <CardActionArea component={AdapterLink} to={`/videos/${video._id}`}>
        <CardMedia
          className={classes.media}
          image={video.cover ? video.cover.url : defaultThumbnail}
          title={`Capa do vídeo ${video.title}`}>
          <VideoIcon className={classes.type} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap style={{ fontWeight: 'bold' }}>
            {video.title}
          </Typography>
          <Typography className={classes.pos} variant="subtitle1">
            {video.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddToCollection item={{_id:video._id}} />
        <AddBookmark item={{_id:video._id, hasSaved: video.hasSaved}} />
      </CardActions>
    </Card>
  );
}
