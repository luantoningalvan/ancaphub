import React, { Fragment, useState } from 'react';
import {
  IconButton,
  MenuItem,
  Menu,
  CircularProgress,
  Switch,
  Avatar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {
  Person as PersonIcon,
  Edit as ContributionsIcon,
  Settings as SettingsIcon,
  Bookmarks as BookmarkIcon,
  ExitToApp as LogoutIcon,
  BrightnessMedium as DarkModeIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ProfilePicture from '../profile/profilePicture';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../actions/authActions';
import { setDarkMode } from '../../actions/templateActions';

const useStyles = makeStyles(theme => ({
  menuIcon: {
    margin: '5px 10px 5px 0px'
  }
}))

function UserMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const classes = useStyles()

  return (
    <Fragment>
      {props.auth.loading ? (
        <Avatar
          edge="end"
          aria-label="Entrar"
          style={{ background: "#161616", margin: '12px 0px' }}
        >
          <CircularProgress color="secondary" />
        </Avatar>
      ) : (
              <Fragment>
                <IconButton
                  edge="end"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <ProfilePicture
                    avatar={props.auth.user.avatar}
                    width="40px"
                    height="40px"
                    style={{ background: "#fff" }}
                  />
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
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to={`/${props.auth.user._id}`}
                  >
                    <PersonIcon className={classes.menuIcon} />
                    Perfil
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to={`/contributions`}
                  >
                    <ContributionsIcon className={classes.menuIcon} />
                    Contribuições
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to={`/bookmarks`}
                  >
                    <BookmarkIcon className={classes.menuIcon} />
                    Salvos
                  </MenuItem>

                  <MenuItem>
                    <DarkModeIcon className={classes.menuIcon} />
                    DarkMode
                    <Switch
                      checked={props.darkMode}
                      onClick={() => props.setDarkMode()}
                      edge="end"
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to={`/settings`}
                  >
                    <SettingsIcon className={classes.menuIcon} />
                    Configurações
                  </MenuItem>
                  <MenuItem onClick={() => props.logoutUser()}>
                    <LogoutIcon className={classes.menuIcon} />
                    Sair
                    </MenuItem>
                </Menu>
              </Fragment>
        )}
    </Fragment>
  );
}

const mapStateToProps = state => ({ auth: state.auth, darkMode: state.template.darkMode });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutUser, setDarkMode }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
