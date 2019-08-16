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
import loadImage from '../utils/loadImage'

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
            {
              props.user.avatar && props.user.avatar != "" ? (
                <Avatar src={`http://localhost:3000/public/images/uploads/${props.user.avatar}`} alt={name} style={{ width: '40px', height: '40px' }} />
              ) : (
                  <Avatar src={loadImage('defaultProfilePicture.png')} alt="Foto de perfil genérica" style={{ width: '40px', height: '40px' }} />
                )
            }
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
            <Link component={AdapterLink} to={`/painel-de-contribuicoes`} underline="none"><MenuItem onClick={handleMenuClose}>Contribuições</MenuItem></Link>
            <Link component={AdapterLink} to={`/salvos`} underline="none"><MenuItem onClick={handleMenuClose}>Salvos</MenuItem></Link>
            <Link component={AdapterLink} to={`/configuracoes`} underline="none"><MenuItem onClick={handleMenuClose}>Configurações</MenuItem></Link>
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
