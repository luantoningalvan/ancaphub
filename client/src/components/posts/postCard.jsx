import React from 'react';

// Material-UI Components
import {
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Menu,
  MenuItem,
  Button,
  Link as MDLink
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

// Material-UI Icons
import {
  MoreVert as MoreVertIcon,
  CommentOutlined as CommentIcon
} from '@material-ui/icons';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deletePost, updateLikes } from '../../actions/postActions';

// Other
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import { Link } from 'react-router-dom';
import ptBr from 'moment/locale/pt-br'
import isEmpty from 'is-empty'

// Custom Components
import ProfilePicture from '../profile/profilePicture';
import LikeButton from './likeButton'
import ShowLikes from './showLikes'
import CommentBox from './commentBox'
import ShowName from '../profile/showName'

// Templates
import Status from './templates/status'
import ItemAddedToLibrary from './templates/itemAddedToLibrary'

const templates = {
  library_item: () => ItemAddedToLibrary,
  status: () => Status
}

const activities = {
  status: null,
  library_item: 'adicionou um item à sua coleção particular'
};

const useStyles = makeStyles(theme => ({
  postActions: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent:"space-between",
    display: 'flex',
    alignItems: 'center',
    padding: '0px 0px 0px 3px',
    margin: 0
  },
  postAction: {
    display: 'flex',
    listStyle: 'none',
    marginRight: 8
  },
  userName: {
    fontWeight: 'bold', 
    color: "inherit", 
    textDecoration: 'none',
    fontSize: 15
  },
  counters: {
    marginLeft: 5,
    cursor: 'pointer'
  },
  verifiedUser: {
    background: theme.palette.secondary.main,
    borderRadius: 15,
    color: 'white',
    padding:'5px 10px',
    marginRight: 5,
  }
}))

function ActivityCard({ post, authUser, deletePost, updateLikes }) {
  const { _id, type, user, createdAt, likeCount} = post;
  const ownProfile = authUser.isAuthenticated && user._id === authUser.user._id;
  const Template = !isEmpty(post) ? templates[type]() : <p>Ocorreu um Erro</p>
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  const [showLikesState, setShowLikesState] = React.useState(false);
  const classes = useStyles()

  const handleAnchor = (event) => {
    setAnchorEl(anchorEl == null ? event.currentTarget : null);
  }

  const handleCommentBox = () => {
    setExpanded(!expanded)
  }

  const handleShowLikes = () => {
    setShowLikesState(!showLikesState)
  }

  const handleDelete = () => {
    const confirm = window.confirm('Você realmente deseja excluir a postagem?');

    if (confirm) {
      deletePost(_id);
    }
  }

  return (
    <Box mb={2}>
      <ShowLikes postId={_id} open={showLikesState} closeFunc={handleShowLikes}/>
      <Card elevation={0}>
        <CardHeader
          avatar={
            <ProfilePicture avatar={user.avatar} width="45px" height="45px" component={Link} to={`/${user._id}`} />
          }
          action={
            ownProfile && (
              <IconButton aria-label="Settings" onClick={handleAnchor}>
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            <div style={{marginBottom: classes.verifiedUser && 5 }}>
              <ShowName user={user} />
              <span style={{ fontSize: '13px', color: '#aaa' }}>
                {` ${activities[type] || ''}`}
              </span>
            </div>
          }
          subheader={moment(createdAt).tz('America/Sao_Paulo').locale('pt-br', ptBr).startOf(createdAt).fromNow()}
        />
        <CardContent style={{ padding: '0px 16px' }}>
          <Template post={post} />
        </CardContent>
        <CardActions>
          <ul className={classes.postActions}>
            <li className={classes.postAction}>
              <ul className={classes.postActions}>
                <li className={classes.postAction}>
                  <LikeButton post={post} action={updateLikes} />
                </li>
                <li  className={classes.postAction}>
                  <Button startIcon={<CommentIcon />} onClick={handleCommentBox}>
                    Comentar
                  </Button>
                </li>
              </ul>
            </li>
            
            <li className={classes.postAction}>
              <ul className={classes.postActions}>
                <li className={classes.postAction}>
                <MDLink onClick={handleShowLikes} color="textPrimary">
                {`${post.likeCount} ${post.likeCount > 1 ? "curtidas" : "curtida"}`}
                </MDLink>
              </li>
              <li className={classes.postAction}>
                <MDLink onClick={handleCommentBox} color="textPrimary">
                  {`${post.comments.length} ${post.comments.length > 1 ? "comentários" : "comentário"}`}
                </MDLink>
              </li>
              </ul>
            </li>
          </ul>
        </CardActions>
        <CommentBox expanded={expanded} post={post}/>
      </Card>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAnchor}>
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
