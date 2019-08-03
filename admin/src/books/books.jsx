import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAllBooks, deleteBook } from './bookActions'
import isEmpty from 'is-empty'
import Template from '../template/template'
import Hero from '../template/hero'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Books(props) {
  const { items, total } = props.books
  const [clientCurrentPage, setCurrentPage] = React.useState(1)
  const [clientPageSize, setPageSize] = React.useState(20)

  useEffect(() => props.fetchAllBooks(clientCurrentPage, clientPageSize), []);

  return (
    <Template>
      <Hero title="Livros" />
      <Box my={3}>
        <Container>
          <Paper>
            {items && !isEmpty(items) ? (
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
                    {items.map(book => (
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
            ) : (
                <Box p={2}>
                  <Typography variant="body2">Nenhum livro cadastrado.</Typography>
                </Box>
              )}
          </Paper>

        </Container>
      </Box>
    </Template>
  )
}

const mapStateToProps = (state) => ({ books: state.books.allBooks })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllBooks, deleteBook }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Books)
