import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { logoutUser } from './authActions'

function LoggedUserMenu(props) {
    return (
            <Button aria-label="Entrar" color="secondary" onClick={() => props.logoutUser()}>
                Sair
            </Button>
    );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoggedUserMenu)
