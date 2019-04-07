import React, { Component } from 'react'
import Template from '../template/template'
import Hero from '../template/hero'
import Container from '../layout/container'
import Row from '../layout/row'
import Grid from '../layout/grid'

export default class App extends Component{
    render(){
        return(
            <Template>
                <Hero title="Adicionar Livros" />
                <Container>
                    <Row>
                        <Grid col="12">
                            <form action="">
                                <div className="input-field">
                                    <input id="book_title" type="text" className="validate" />
                                    <label className="active" for="book_title">Título do Livro</label>
                                </div>

                                <div className="input-field">
                                    <input id="book_author" type="text" className="validate" />
                                    <label className="active" for="book_author">Autor do Livro</label>
                                </div>

                                <div className="input-field">
                                    <textarea rows="12" id="book_description" class="materialize-textarea"></textarea>
                                    <label for="book_description">Descrição do Livro</label>
                                </div>

                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Carregar</span>
                                        <input type="file" />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Carregar capa do Livro" />
                                    </div>
                                </div>

                                <button className="btn" type="submit">Adicionar Livro</button>
                            </form>
                        </Grid>
                    </Row>
                </Container>
            </Template>
        )
    }
}