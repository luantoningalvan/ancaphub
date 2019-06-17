import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAllBooks, deleteBook } from './booksAction'

import Template from '../template/template'
import Hero from '../template/hero'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function App(props) {

    useEffect(() => props.fetchAllBooks(), []);

    return (
        <Template>
            <Hero title="Livros" />
            <Box mt={3}>
                <Container>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Titulo</TableCell>
                                    <TableCell align="left">Autor</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {props.books.allBooks.map(book => (
                                    <TableRow key={book._id}>
                                        <TableCell align="left">{book.title}</TableCell>
                                        <TableCell align="left">{book.author}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/books/edit/${book._id}`} >
                                                <IconButton aria-label="Editar">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>

                                            <IconButton aria-label="Delete" onClick={() => props.deleteBook(book._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </Box>
        </Template>
    )
}

const mapStateToProps = (state) => ({ books: state.books })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllBooks, deleteBook }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)