import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  Book as BookIcon,
  CloudDownload as DownloadIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty'
import filesize from 'filesize'
import querystring from 'querystring'
import axios from '../../../services/api'
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

export default function BookCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [files, setFiles] = useState([]);
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const { book } = props;

  useEffect(() => {
    if (book.extraFields && book.extraFields.downloadOptions) {
      axios.get(`/api/files?${querystring.stringify({ 'files': JSON.stringify(book.extraFields.downloadOptions) })}`)
      .then(result =>
        setFiles(result.data.map(file => ({
          id: file._id,
          name: file.originalname,
          readableSize: filesize(file.size),
          url: file.url,
        })))
      )
    }
  }, [book])

  return (
    <Card>
      <CardActionArea component={AdapterLink} to={`/books/${book._id}`}>
        <CardMedia
          className={classes.media}
          image={book.cover ? book.cover.url : defaultThumbnail}
          title={`Capa do livro ${book.title}`}>
          <BookIcon className={classes.type} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap style={{ fontWeight: 'bold' }}>
            {book.title}
          </Typography>
          <Typography variant="subtitle1">{book.author}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <AddToCollection item={book._id} />
          <SaveItem item={book._id} />
        </div>
        {files && !isEmpty(files) && (
          <>
            <IconButton size="small" color="secondary" onClick={handleClick}>
              <DownloadIcon />
            </IconButton>
            <Menu
              id={`menubook-${book._id}`}
              getContentAnchorEl={null}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center'
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              {files.map(download => (
                <MenuItem
                  component="a"
                  key={`${book._id} ${download.name}`}
                  href={download.url}
                  target="_blank">
                  {download.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </CardActions>
    </Card>
  );
}
