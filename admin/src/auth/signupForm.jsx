import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'

class SignupForm extends Component{
    render(){

        const { handleSubmit } = this.props

        return(
            <form role="form" onSubmit={handleSubmit}>
                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded">
                            <Field className="input" name="first_name" component="input" type="text "placeholder="Nome" />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control is-expanded">
                            <Field className="input" name="last_name" component="input" type="text "placeholder="Sobrenome" />
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({form: 'loginForm'})(SignupForm)