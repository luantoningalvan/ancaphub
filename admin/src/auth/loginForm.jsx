import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'

class LoginForm extends Component{
    render(){

        const { handleSubmit } = this.props

        return (
            <form role="form" onSubmit={handleSubmit}>    
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <Field className="input" name="email" component="input" type="email "placeholder="E-mail" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left">
                        <Field className="input" name="password" component="input" type="password" placeholder="Senha" />  
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control">
                        <button className="button is-success" onClick={this.props.loginAction}>Login</button>
                    </p>
                </div>
            </form>
        )
    }
}

export default reduxForm({form: 'loginForm'})(LoginForm)