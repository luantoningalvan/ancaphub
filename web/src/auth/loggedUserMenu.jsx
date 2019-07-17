import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logoutUser } from './authActions'
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
const useStyles = makeStyles(theme => ({
  letterAvatar: {
    backgroundColor: theme.palette.secondary.main
  }
}));

function LoggedUserMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      {props.user != null && (
        <React.Fragment>
          <IconButton
            edge="end"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar className={classes.letterAvatar}>{props.user.name.substring(0, 1)}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            getContentAnchorEl={null}
          >
            <Link component={AdapterLink} to={`/usuario/${props.user._id}`} underline="none"><MenuItem onClick={handleMenuClose}>Perfil</MenuItem></Link>
            <MenuItem onClick={() => props.logoutUser()}>Sair</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserMenu)
