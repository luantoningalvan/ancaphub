import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddToCollection from '../../components/addItemToCollection'
import striptags from 'striptags';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function ArticleCard(props) {
  const classes = useStyles();
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  const { _id, title, author, cover, content } = props.article;
  return (
    <Card>
      <CardActionArea component={AdapterLink} to={`/artigos/artigo/${_id}`}>
        <CardMedia
          className={classes.media}
          image={cover}
          title={`Capa do artigo ${title}`}
        />
        <CardContent>
          <Typography variant="h5" component="h2" noWrap>
            {title}
          </Typography>
          <Typography className={classes.pos} variant="subtitle1" gutterBottom>
            {author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {(content.length > 200) ? `${striptags(content.substring(0, 200))}..` : striptags(content)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddToCollection item={_id} />
      </CardActions>
    </Card>
  );
}
