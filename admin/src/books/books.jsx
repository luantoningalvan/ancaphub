import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBookList } from './booksAction'

import Template from '../template/template'
import Hero from '../template/hero'
import Container from '@material-ui/core/Container';

class App extends Component{

    componentWillMount(){
        this.props.getBookList()
    }

    renderRows(){
        const list = this.props.book.list || []
        return list.map(bc => (
            <TableRow key={bc._id}>
                <TableCell>{bc.title}</TableCell>
                <TableCell>{bc.author}</TableCell>                
                <TableCell></TableCell>
            </TableRow>
        ))
    }

    render(){
        return(
        <Template>
            <Hero title="Livros" />

            <Container>
                <Paper>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Titulo</TableCell>
                            <TableCell>Autor</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.renderRows()}
                    </TableBody>
                    </Table>
                </Paper>
            </Container>
        </Template>
        )
    }
}

const mapStateToProps = (state) => ({book: state.books})
const mapDispatchToProps = (dispatch) => bindActionCreators({getBookList}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)