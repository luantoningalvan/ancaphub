import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import RateItem from '../../../components/rateItem';
import AddToCollection from '../../../components/addItemToCollection'
import SaveItem from '../../../components/saveItem'
import ArticleIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
        >
          <ArticleIcon className={classes.type} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="h2" noWrap>
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
        <RateItem item={_id} />
      </CardActions>
    </Card>
  );
}
