import React from 'react'
import {connect} from 'react-redux'
import { login } from './authActions'
import { bindActionCreators } from 'redux';

import Template from '../template/template'
import Hero from '../template/hero'

const Login = (props) => (
  <Template>
    <Hero title="Login" /> 
    <div className="container">
      <button onClick={props.login}>Teste</button>
    </div>
  </Template>
)

function mapStateToProps(state){
  return {login: state.auth}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({login},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)