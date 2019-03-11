import React from 'react'
import Template from '../template/template'
import Hero from '../template/hero'

export default props => (
  <Template>
    <Hero title="Cadastro" subtitle="Preencha os dados e crie sua conta para ter acesso a todas as funcionalidades do site." /> 
    <div className="container">
        <form>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded">
                            <input className="input" type="text" placeholder="Nome" />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control is-expanded">
                            <input className="input" type="text" placeholder="Sobrenome" />
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </div>
  </Template>
)