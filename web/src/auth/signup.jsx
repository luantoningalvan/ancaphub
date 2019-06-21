import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';

import { signUp } from './authActions'

function SignUp() {
  return (
    <p>Cadastro não disponível.</p>
  )
}

function mapStateToProps(state){
    return {signup: state.auth}
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({signUp},dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp)