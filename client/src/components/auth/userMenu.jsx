import React, { Fragment } from 'react';
import {
  IconButton,
  MenuItem,
  Menu,
  Link,
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Avatar,
  CircularProgress
} from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import ProfilePicture from '../profile/profilePicture';
import Login from './login';
import Signup from './signup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../actions/authActions';

const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));


function UserMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

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
            {props.auth.isAuthenticated ? (
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
                  getContentAnchorEl={null}>
                  <Link
                    component={AdapterLink}
                    to={`/usuario/${props.auth.user._id}`}
                    underline="none" color="textPrimary">
                    <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
                  </Link>
                  <Link
                    component={AdapterLink}
                    to={`/painel-de-contribuicoes`}
                    underline="none" color="textPrimary">
                    <MenuItem onClick={handleMenuClose}>Contribuições</MenuItem>
                  </Link>
                  <Link component={AdapterLink} to={`/salvos`} underline="none" color="textPrimary">
                    <MenuItem onClick={handleMenuClose}>Salvos</MenuItem>
                  </Link>
                  <Link
                    component={AdapterLink}
                    to={`/configuracoes`}
                    underline="none"
                    color="textPrimary"
                  >
                    <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
                  </Link>
                  <MenuItem onClick={() => props.logoutUser()}>Sair</MenuItem>
                </Menu>
              </Fragment>
            ) : (
                <Fragment>
                  <IconButton
                    edge="end"
                    aria-label="Entrar"
                    color="inherit"
                    onClick={handleClickOpen}>
                    <Avatar>
                      <PersonIcon size="medium" />
                    </Avatar>
                  </IconButton>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title">
                    <DialogContent>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth">
                        <Tab label="Cadastro" />
                        <Tab label="Entrar" />
                      </Tabs>
                      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                        <Signup />
                        <Login />
                      </SwipeableViews>
                    </DialogContent>
                  </Dialog>
                </Fragment>
              )}
          </Fragment>
        )}
    </Fragment>
  );
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
