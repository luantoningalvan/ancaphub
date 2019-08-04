import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import AddToCollection from '../components/addItemToCollection'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function BookCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const { book } = props;

  return (

    <Card>
      <CardActionArea component={AdapterLink} to={`/livros/${book._id}`}>
        <CardMedia
          className={classes.media}
          image={book.cover}
          title={`Capa do livro ${book.title}`}
        />
        <CardContent>
          <Typography variant="h5" component="h2" noWrap>
            {book.title}
          </Typography>
          <Typography className={classes.pos} variant="subtitle1" gutterBottom>
            {book.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.content ? ((book.content.length > 200) ? `${book.content.substring(0, 200)}..` : book.content) : "Nenhuma descrição disponível."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton size="small" color="primary" onClick={handleClick}>
          <DownloadIcon />
        </IconButton>
        <AddToCollection item={book._id} />
        <Menu
          id={`menubook-${book._id}`}
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {book.extraFields.downloadOptions.map(download => (
            <MenuItem component="a" key={`${book._id} ${download.type}`} href={download.file} target="_blank">{download.type.toUpperCase()}</MenuItem>
          ))}

        </Menu>
      </CardActions>
    </Card>

  )
}