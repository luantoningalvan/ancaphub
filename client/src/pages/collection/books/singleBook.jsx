import React, { useEffect, useState, Fragment } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Link
} from '@material-ui/core';
import { CloudDownload as DownloadIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import filesize from 'filesize'
import querystring from 'querystring'
import isEmpty from 'is-empty';
import axios from '../../../services/api'
import defaultThumbnail from '../../../assets/images/default-thumbnail.jpg'
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import Categories from '../../../components/categories/showElementCategories';
import Ratings from '../../../components/collection/ratings';
import ProfilePicture from '../../../components/profile/profilePicture';
import LoadContent from '../../../components/loaders/loadContent'
import UnavaliableContent from '../../../components/error/unavaliableContent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItem } from '../../../actions/itemActions';

function SingleBook({match, fetchItem, book}) {
  const { id } = match.params;
  const [files, setFiles] = useState([]);

  useEffect(() => fetchItem(id), [fetchItem, id]);

  const {
    _id,
    title,
    author,
    categories,
    content,
    cover,
    user,
    extraFields
  } = book.item;



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

  const useStyles = makeStyles(theme => {
    return ({
      banner: {
        background: `url(${cover ? cover.url : defaultThumbnail}) rgba(0,0,0,0.5)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        width: '100%',
        height: '230px',
        "&::after": {
          height: '230px',
          width: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,.4) 0%,rgba(0,0,0,1) 100%)',
          content: `""`,
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.7,
        },
      },
      title: {
        fontWeight: 'bold',
        color: 'white',
        [theme.breakpoints.down('xs')]: {
          color: theme.palette.primary.dark,
        },
      },
      author: {
        fontWeight: 'light',
        color: 'white',
        [theme.breakpoints.down('xs')]: {
          color: theme.palette.getContrastText('#fff'),
        },
      },
      icon: {
        color: '#ccc'
      }
    })
  });

  const classes = useStyles();

  return (
    <Template noPadding>
      <LoadContent loading={book.loading}>
        {!isEmpty(book.item) && book.item.type === 'book' ? (
          <Fragment>
            <Title title={`${title} - ${author}`} />
            <div className={classes.banner}></div>
            <Box mt={-17} position="absolute" width="inherit">
              <Container>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5} md={4}>
                    <Paper>
                      <img
                        src={cover ? cover.url : defaultThumbnail}
                        alt={`Capa do livro ${title}`}
                        style={{ width: '100%' }}
                      />
                      <List>
                        {files && files.map(download => (
                          <ListItem key={`${_id} ${download.name}`}>
                            <ListItemText primary={download.name} />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="Delete"
                                className={classes.icon}
                                href={download.url}
                                target="_blank">
                                <DownloadIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                    <Box mt={2}>
                      <span>Enviado por</span>
                      <Link
                        component={RouterLink}
                        to={`/usuario/${user._id}`}
                        underline="none"
                        color="textPrimary">
                        <Box display="flex" alignItems="center" mt={1}>
                          <ProfilePicture
                            avatar={user.avatar}
                            width="40px"
                            height="40px"
                          />
                          <span style={{ paddingLeft: '10px' }}>{user.name}</span>
                        </Box>
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={8}>
                    <Box mb={2}>
                      <Categories categories={categories} />
                      <Typography
                        variant="h4"
                        component="h2"
                        className={classes.title}>
                        {title}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="h3"
                        className={classes.author}>
                        {author}
                      </Typography>
                    </Box>
                    <Typography variant="body1" style={{ paddingTop: '16px' }}>
                      {content}
                    </Typography>
                    <Box my={2}>
                      <Ratings item={book.item} />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Fragment>
        ) : (
            <Container>
              <Box mt={2}>
                <UnavaliableContent />
              </Box>
            </Container>
          )}
      </LoadContent>
    </Template>
  );
}
const mapStateToProps = state => ({ book: state.items });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBook);
