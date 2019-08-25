import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Template from '../../../template/template'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DownloadIcon from '@material-ui/icons/CloudDownload'
import IconButton from '@material-ui/core/IconButton';
import Categories from '../../../components/categories/showElementCategories'
import Ratings from '../../../components/ratings'
import isEmpty from 'is-empty'
import loadImage from '../../../utils/loadImage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchItem } from '../itemActions'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function SingleBook(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchItem(id), []);

  const { _id, title, author, categories, content, cover, user, extraFields } = props.book.item;

  const useStyles = makeStyles(theme => ({
    banner: {
      position: 'absolute',
      left: 0,
      top: 0,
      background: `url(${cover}) rgba(0,0,0,0.5)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: "100%",
      height: "230px",
    },
    bannelOverlay: {
      width: '100%',
      height: '100%',
      background: 'black',
      opacity: 0.8
    },
    title: {
      fontWeight: 'bold',
      color: 'white'
    },
    author: {
      fontWeight: 'light',
      color: 'white'
    }
  }));

  const classes = useStyles();

  return (
    <Template noPadding>
      {!isEmpty(props.book.item) && props.book.item.type == "book" && (
        <>
          <div className={classes.banner}>
            <div className={classes.bannelOverlay}></div>
          </div>
          <Container style={{ position: 'absolute', marginTop: '100px', width: 'auto' }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Paper>
                  <img src={cover} alt={`Capa do livro ${title}`} style={{ width: '100%' }} />
                  <List>
                    {extraFields.downloadOptions && extraFields.downloadOptions.map(download => (
                      <ListItem key={`${_id} ${download.type}`}>
                        <ListItemText
                          primary={download.type.toUpperCase()}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="Delete" href={download.file} target="_blank">
                            <DownloadIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <Box mt={2}>
                  <span>Enviado por</span>
                  <Link component={RouterLink} to={`/usuario/${user._id}`} underline='none' color="textPrimary">
                    <Box display='flex' alignItems='center' mt={1}>
                      <div>
                        {
                          user.avatar && user.avatar != "" ? (
                            <Avatar src={`http://localhost:3000/public/images/uploads/${user.avatar}`} alt={user.name} style={{ width: '40px', height: '40px' }} />
                          ) : (
                              <Avatar src={loadImage('defaultProfilePicture.png')} alt="Foto de perfil genérica" style={{ width: '40px', height: '40px' }} />
                            )
                        }
                      </div>
                      <span style={{ paddingLeft: '10px' }}>{user.name}</span>
                    </Box>
                  </Link>
                </Box>
              </Grid>

              <Grid item xs={9}>
                <Box mb={2}>
                  <Categories categories={categories} />
                  <Typography variant="h4" component="h2" className={classes.title}>{title}</Typography>
                  <Typography variant="h6" component="h3" className={classes.author}>{author}</Typography>
                </Box>
                <Typography variant="body1" style={{ paddingTop: '16px' }}>
                  {content}
                </Typography>
                <Box my={2}>
                  <Ratings item={props.book.item} />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Template>

  )
}


const mapStateToProps = (state) => ({ book: state.items })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchItem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
