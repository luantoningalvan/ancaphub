import React, { Component } from 'react'
import Template from '../template/template'
import Container from '../layout/container'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBookList } from './booksAction'

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
                <Container>
                
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
                </Container>
            </Template>
        )
    }
}

const mapStateToProps = (state) => ({book: state.books})
const mapDispatchToProps = (dispatch) => bindActionCreators({getBookList}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)