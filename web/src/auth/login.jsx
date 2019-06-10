import React, { Component } from 'react'
import {connect} from 'react-redux'
import { signIn } from './authActions'
import { bindActionCreators } from 'redux';

import Template from '../template/template'
import LoginForm from './loginForm'

class Login extends Component {
  render(){
    return(
      <Template>
        <div className="container">
          <LoginForm onSubmit={this.props.signIn} />
        </div>
      </Template>
    )
  }
}

function mapStateToProps(state){
  return {login: state.auth}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({signIn},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)