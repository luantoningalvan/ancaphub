import React, { useEffect } from 'react'
import Template from '../template/template'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUser } from './userActions'

function LoggedUserMenu(props) {
  const { id } = props.match.params;
  useEffect(() => props.getUser(id), []);

  return (
    <Template>
    <h1>Perfil</h1>
    <p>Este é o perfil de {props.user.name}</p>
  </Template>
  );
}

const mapStateToProps = state => ({ user: state.users.user })
const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserMenu)
