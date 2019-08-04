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
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addItemToLibrary } from '../auth/authActions'

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function BookCard(props) {
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
    <Grid item xs={12} sm={6} md={4} lg={3}>
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
          {props.auth.isAuthenticated && (
            <IconButton size="small" color={props.auth.user.personalCollection.includes(book._id) ? "secondary" : "primary"} onClick={() => props.addItemToLibrary(book._id)}>
              <LibraryAddIcon />
            </IconButton>
          )}

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
    </Grid>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ addItemToLibrary }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BookCard)