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
import { fetchAllArticles, deleteArticle } from './articleActions'

import Template from '../template/template'
import Hero from '../template/hero'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Articles(props) {

    useEffect(() => props.fetchAllArticles(), []);

    return (
        <Template>
            <Hero title="Artigos" />
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
                                {props.articles.allArticles.map(article => (
                                    <TableRow key={article._id}>
                                        <TableCell align="left">{article.title}</TableCell>
                                        <TableCell align="left">{article.author}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/articles/edit/${article._id}`} >
                                                <IconButton aria-label="Editar">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>

                                            <IconButton aria-label="Delete" onClick={() => props.deleteArticle(article._id)}>
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

const mapStateToProps = (state) => ({ articles: state.articles })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllArticles, deleteArticle }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Articles)