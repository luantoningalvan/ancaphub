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

export default function BookCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [files, setFiles] = useState([]);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const { book } = props;
  const { _id, cover, title, author, extraFields, hasSaved, inLibrary} = book

  useEffect(() => {
    if (extraFields && extraFields.downloadOptions) {
      axios.get(`/api/files?${querystring.stringify({ 'files': JSON.stringify(extraFields.downloadOptions) })}`)
      .then(result =>
        setFiles(result.data.map(file => ({
          id: file._id,
          name: file.originalname,
          readableSize: filesize(file.size),
          url: file.url,
        })))
      )
    }
  }, [extraFields])

  return (
    <Card>
      <CardActionArea component={Link} to={`/books/${_id}`}>
        <CardMedia
          className={classes.media}
          image={cover ? cover.url : defaultThumbnail}
          title={`Capa do livro ${title}`}>
          <BookIcon className={classes.type} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="h2" noWrap style={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1">{author}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <AddToLibrary item={{_id, inLibrary, location: props.location}} />
          <AddBookmark item={{_id, hasSaved, location: props.location}}  />
        </div>
        {files && !isEmpty(files) && (
          <>
            <IconButton size="small" color="secondary" onClick={handleClick}>
              <DownloadIcon />
            </IconButton>
            <Menu
              id={`menubook-${_id}`}
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
                  key={`${_id} ${download.name}`}
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
