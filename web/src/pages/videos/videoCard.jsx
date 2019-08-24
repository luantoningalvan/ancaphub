import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import RateItem from '../../components/rateItem';
import AddToCollection from '../../components/addItemToCollection'
import SaveItem from '../../components/saveItem'
import VideoIcon from '@material-ui/icons/PlayArrow'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  type: {
    margin: theme.spacing(1),
    borderRadius: '5px',
    color: 'white'
  },
}));

export default function VideoCard(props) {
  const classes = useStyles();
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  const { video } = props;

  return (
    <Card>
      <CardActionArea component={AdapterLink} to={`/videos/video/${video._id}`}>
        <CardMedia
          className={classes.media}
          image={video.cover}
          title={`Capa do vídeo ${video.title}`}
        >
          <VideoIcon className={classes.type} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="h2" noWrap>
            {video.title}
          </Typography>
          <Typography className={classes.pos} variant="subtitle1">
            {video.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddToCollection item={video._id} />
        <SaveItem item={video._id} />
        <RateItem item={video._id} />
      </CardActions>
    </Card>

  )
}