import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deletePost, updateLikes } from './postActions';
import ProfilePicture from '../profilePicture';
import striptags from 'striptags';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

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
    props.authUser.isAuthenticated && user._id == props.authUser.user._id;

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
              color="textPrimary">
              <ProfilePicture avatar={user.avatar} width="50px" height="50px" />
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
              color="textPrimary">
              {user.name}{' '}
              <span style={{ fontSize: '13px', color: '#aaa' }}>
                {activities[type]}
              </span>
            </Link>
          }
          subheader={createdAt}
        />
        <CardContent>
          {type == 'status' && (
            <Typography variant="body2" color="textSecondary" component="p">
              {content}
            </Typography>
          )}

          {type == 'collection_item' && (
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
            <Button
              aria-label="Curtir"
              color={
                likes.includes(props.authUser.user._id)
                  ? 'secondary'
                  : 'primary'
              }
              onClick={() => props.updateLikes(_id)}>
              <FavoriteIcon style={{ marginRight: '10px' }} />
              {likes.length}
            </Button>
          ) : (
            <Typography variant="body2" style={{ paddingLeft: '8px' }}>
              {likes.length} Curtida(s)
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
