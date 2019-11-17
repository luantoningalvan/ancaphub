import React from 'react';
import {
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Box,
  Menu,
  MenuItem,
  Link
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as NotFavoriteIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import striptags from 'striptags';
import ProfilePicture from '../profile/profilePicture';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deletePost, updateLikes } from '../../actions/postActions';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import ptBr from 'moment/locale/pt-br'

function ActivityCard(props) {

  const {
    _id,
    content,
    type,
    extraFields,
    user,
    likes = [],
    createdAt
  } = props.post;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const activities = {
    status: null,
    collection_item: 'adicionou um item à sua coleção particular'
  };

  const types = {
    book: 'livro',
    article: 'artigo',
    video: 'video',
    podcast: 'podcas'
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const isUserLoggedProfile =
    props.authUser.isAuthenticated && user._id === props.authUser.user._id;

  function handleDelete() {
    const confirm = window.confirm('Você realmente deseja excluir a postagem?');

    if (confirm) {
      props.deletePost(_id);
    }
  }

  return (
    <Box mb={2}>
      <Card>
        <CardHeader
          avatar={
            <Link
              component={RouterLink}
              to={`/usuario/${user._id}`}
              underline="none"
            >
              <ProfilePicture avatar={user.avatar} width="40px" height="40px" />
            </Link>
          }
          action={
            isUserLoggedProfile && (
              <IconButton aria-label="Settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            <Link
              component={RouterLink}
              to={`/usuario/${user._id}`}
              underline="none"
              color="secondary">
              <span style={{ fontWeight: 'bold' }}>{user.name + " "}</span>
              <span style={{ fontSize: '13px', color: '#aaa' }}>
                {activities[type]}
              </span>
            </Link>
          }
          subheader={moment(createdAt).tz('America/Sao_Paulo').locale('pt-br', ptBr).startOf(createdAt).fromNow()}
        />
        <CardContent style={{ padding: '0px 16px' }}>
          {type === 'status' && (
            <Typography variant="body2" color="textSecondary" component="p">
              {content}
            </Typography>
          )}

          {type === 'collection_item' && (
            <Card>
              <CardActionArea
                component={RouterLink}
                to={`/${types[extraFields.type]}s/${types[extraFields.type]}/${
                  extraFields._id
                  }`}>
                <CardMedia
                  component="img"
                  height="240"
                  image={extraFields.cover}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {extraFields.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {`${striptags(
                      extraFields.description.substring(0, 240)
                    )}...`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        </CardContent>
        <CardActions disableSpacing>
          {props.authUser.isAuthenticated ? (
            <>
              <IconButton
                aria-label="Curtir"
                color="secondary"
                onClick={() => props.updateLikes(_id)}>
                {!likes.includes(props.authUser.user._id) ? (
                  <NotFavoriteIcon />
                ) : (
                    <FavoriteIcon />
                  )}

              </IconButton>
              <Typography variant="body2" style={{ paddingLeft: '8px' }}>
                {likes.length} curtida(s)
            </Typography>
            </>
          ) : (
              <Typography variant="body2" style={{ paddingLeft: '8px' }}>
                {likes.length} curtida(s)
            </Typography>
            )}
        </CardActions>
      </Card>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
      </Menu>
    </Box>
  );
}
const mapStateToProps = state => ({ authUser: state.auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ deletePost, updateLikes }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityCard);
