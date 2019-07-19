import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
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
import { deletePost } from './postActions'

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: "#f9a825",
  },
}));

function ActivityCard(props) {
  const classes = useStyles();
  const { _id, content, user, createdAt } = props.post

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDelete() {
    const confirm = window.confirm("Você realmente deseja excluir a postagem?")

    if (confirm) {
      props.deletePost(_id)
    }
  }

  return (
    <Box mt={2}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              L
            </Avatar>
          }
          action={
            <IconButton aria-label="Settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
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
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ deletePost }, dispatch)

export default connect(null, mapDispatchToProps)(ActivityCard)
