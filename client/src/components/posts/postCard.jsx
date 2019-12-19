import React from 'react';

// Material-UI Components
import {
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Menu,
  MenuItem,
  Link
} from '@material-ui/core';

// Material-UI Icons
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as NotFavoriteIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deletePost, updateLikes } from '../../actions/postActions';

// Other
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import { Link as RouterLink } from 'react-router-dom';
import ptBr from 'moment/locale/pt-br'
import isEmpty from 'is-empty'

// Custom Components
import ProfilePicture from '../profile/profilePicture';

// Templates
import Status from './templates/status'
import ItemAddedToCollection from './templates/itemAddedToCollection'

const templates = {
  collection_item: () => ItemAddedToCollection,
  status: () => Status
}

const activities = {
  status: null,
  collection_item: 'adicionou um item à sua coleção particular'
};

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
  const isUserLoggedProfile = props.authUser.isAuthenticated && user._id === props.authUser.user._id;
  const Template = !isEmpty(props.post) ? templates[type]() : <p>Ocorreu um Erro</p>

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDelete = () => {
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
              to={`/${user._id}`}
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
              to={`/${user._id}`}
              underline="none"
              color="secondary">
              <span style={{ fontWeight: 'bold' }}>{user.username + " "}</span>
              <span style={{ fontSize: '13px', color: '#aaa' }}>
                {activities[type]}
              </span>
            </Link>
          }
          subheader={moment(createdAt).tz('America/Sao_Paulo').locale('pt-br', ptBr).startOf(createdAt).fromNow()}
        />
        <CardContent style={{ padding: '0px 16px' }}>
          <Template post={props.post}/>
        </CardContent>
        <CardActions disableSpacing>
          {props.authUser.isAuthenticated ? (
            <>
              <IconButton
                aria-label="Curtir"
                color="secondary"
                size="small"
                onClick={() => props.updateLikes(_id)}>
                {!likes.includes(props.authUser.user._id) ? (
                  <NotFavoriteIcon />
                ) : (
                    <FavoriteIcon />
                  )}

              </IconButton>
              <Typography variant="body2" style={{ paddingLeft: '8px' }}>
                {likes.length}
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
