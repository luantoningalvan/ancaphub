import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import AddToCollection from '../../components/addItemToCollection'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
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
        />
        <CardContent>
          <Typography variant="h5" component="h2" noWrap>
            {video.title}
          </Typography>
          <Typography className={classes.pos} variant="subtitle1" gutterBottom>
            {video.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {video.content ? ((video.content.length > 200) ? `${video.content.substring(0, 200)}..` : video.content) : "Nenhuma descrição disponível."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddToCollection item={video._id} />
      </CardActions>
    </Card>

  )
}