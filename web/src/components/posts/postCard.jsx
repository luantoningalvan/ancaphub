import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deletePost, updateLikes } from './postActions'
import loadImage from '../../utils/loadImage'

function ActivityCard(props) {

  const { _id, content, user, likes = [], createdAt } = props.post
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const isUserLoggedProfile = props.authUser.isAuthenticated && user._id == props.authUser.user._id

  function handleDelete() {
    const confirm = window.confirm("Você realmente deseja excluir a postagem?")

    if (confirm) {
      props.deletePost(_id)
    }
  }

  return (
    <Box mb={2}>
      <Card>
        <CardHeader
          avatar={
            user.avatar && user.avatar != "" ? (
              <Avatar src={user.avatar} alt={user.name} />
            ) : (
                <Avatar src={loadImage('defaultProfilePicture.png')} alt="Foto de perfil genérica" />
              )
          }
          action={
            isUserLoggedProfile && (
              <IconButton aria-label="Settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )

          }
          title={user.name}
          subheader={createdAt}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button aria-label="Curtir" color={likes.includes(props.authUser.user._id) ? "secondary" : "primary"} onClick={() => props.updateLikes(_id)}>
            <FavoriteIcon style={{ marginRight: '10px' }} />
            {likes.length}
          </Button>
        </CardActions>
      </Card>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
      </Menu>
    </Box>
  );
}
const mapStateToProps = (state) => ({ authUser: state.auth })
const mapDispatchToProps = (dispatch) => bindActionCreators({ deletePost, updateLikes }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCard)
