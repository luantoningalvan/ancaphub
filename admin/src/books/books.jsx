import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBookList } from './booksAction'

import Template from '../template/template'
import Hero from '../template/hero'
import Container from '../layout/container'
import Row from '../layout/row'
import Grid from '../layout/grid'

class App extends Component{

    componentWillMount(){
        const test = this.props.getBookList()
        console.log(test)
    }

    renderRows(){
        const list = this.props.book.list || []
        return list.map(bc => (
            <tr key={bc._id}>
                <th>{bc.title}</th>
                <th>{bc.author}</th>
                <th className="table-actions">
                </th>
            </tr>
        ))
    }

    render(){
        return(
            <Template>
                <Hero title="Livros" />
                <Container>
                    <Row>
                        <Grid col="12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Titulo</td>
                                        <td>Autor</td>
                                        <td>Ações</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.renderRows()}
                                </tbody>
                            </table>
                        </Grid>
                    </Row>
                </Container>
            </Template>
        )
    }
}

const mapStateToProps = (state) => ({book: state.books})
const mapDispatchToProps = (dispatch) => bindActionCreators({getBookList}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)