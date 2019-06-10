import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';

import Template from '../template/template'
import SignupForm from './signupForm'
import { signUp } from './authActions'

class SignUp extends Component {
    render(){
        return(
            <Template>
            <div className="container">
                <SignupForm onSubmit={this.props.signUp}/>
            </div>
          </Template>
        )
    }
}

function mapStateToProps(state){
    return {signup: state.auth}
  }
  
  function mapDispatchToProps(dispatch){
    return bindActionCreators({signUp},dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp)