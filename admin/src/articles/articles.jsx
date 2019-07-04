import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAllArticles, deleteArticle } from './articleActions'
import isEmpty from 'is-empty'
import Template from '../template/template'
import Hero from '../template/hero'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Articles(props) {
  const { articles, page, pageSize, total } = props.articles
  const [clientCurrentPage, setCurrentPage] = React.useState(1)
  const [clientPageSize, setPageSize] = React.useState(20)

  useEffect(() => props.fetchAllArticles(clientCurrentPage, clientPageSize), [clientCurrentPage]);

  const checkHowManyItemsAreAlreadyLoaded = () => {
    return page <= parseInt(total / pageSize) ? page * pageSize : total
  }

    return (
        <Template>
            <Hero title="Artigos" />
            <Box mt={3}>
                <Container>
                    <Paper>
                    {articles && !isEmpty(articles) ? (
                      <React.Fragment>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Titulo</TableCell>
                                    <TableCell align="left">Autor</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {articles.map(article => (
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
                        <TablePagination
                          rowsPerPageOptions={[]}
                          component="div"
                          count={total}
                          rowsPerPage={clientPageSize}
                          page={clientCurrentPage - 1}
                          backIconButtonProps={{
                            'aria-label': 'Previous Page',
                          }}
                          nextIconButtonProps={{
                            'aria-label': 'Next Page',
                          }}
                          onChangePage={(e, page) => setCurrentPage(page + 1)}
                          labelDisplayedRows={({ from, to, count }) => (`${from}-${to} de ${count}`)}
                        />
                        </React.Fragment>
                      ) :(
                        <Box p={2}>
                          <Typography variant="body2">Nenhum artigo cadastrado.</Typography>
                        </Box>
                      )}
                    </Paper>

                </Container>
            </Box>
        </Template>
    )
}

const mapStateToProps = (state) => ({ articles: state.articles.allArticles })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllArticles, deleteArticle }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Articles)
