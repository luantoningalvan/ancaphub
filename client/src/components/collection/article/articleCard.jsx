import React from 'react';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';
import { Description as ArticleIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../../../assets/images/default-thumbnail.jpg'
import AddToCollection from '../addItemToCollection';
import SaveItem from '../saveItem';

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

export default function ArticleCard(props) {
  const classes = useStyles();
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));

  const { _id, title, author, cover } = props.article;
  return (
    <Card>
      <CardActionArea component={AdapterLink} to={`/artigos/artigo/${_id}`}>
        <CardMedia
          className={classes.media}
          image={cover ? cover.url : defaultThumbnail}
          title={`Capa do artigo ${title}`}>
          <ArticleIcon className={classes.type} />
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
        <AddToCollection item={_id} />
        <SaveItem item={_id} />
      </CardActions>
    </Card>
  );
}
