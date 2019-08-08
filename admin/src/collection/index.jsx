import React, { useEffect, useState } from 'react';
import Template from '../template/template'
import Hero from '../template/hero'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

import InputAdornment from '@material-ui/core/InputAdornment';
import BookIcon from '@material-ui/icons/Book'
import ArticleIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import isEmpty from 'is-empty'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAllItems, deleteItem } from './collectionActions'
import { fetchAllCategories } from '../components/categories/categoriesAction'

function Books(props) {
  const { items, total } = props.items
  const [clientCurrentPage, setCurrentPage] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({ type: "", category: "" });
  const [search, handleSearch] = useState("")

  useEffect(() => props.fetchAllCategories(), []);
  useEffect(() => props.fetchAllItems(clientCurrentPage, filter), [clientCurrentPage, filter]);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleChange(event) {
    setFilter(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  function confirmDeletion(item) {
    const confirm = window.confirm(`Você realmente deseja excluir "${item.title}"?`)

    if (confirm) {
      props.deleteItem(item._id)
    }
  }


  return (
    <Template>
      <Hero title="Coleção">
        <Button variant="outlined" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <AddIcon style={{ marginRight: '5px' }} />
          Item
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem component={Link} to="/collection/book/add">Livro</MenuItem>
          <MenuItem component={Link} to="/collection/article/add">Artigo</MenuItem>
          <MenuItem onClick={handleClose}>Vídeo</MenuItem>
          <MenuItem onClick={handleClose}>Podcast</MenuItem>
        </Menu>
      </Hero>
      <Container>
        <Box my={3}>
          <Paper>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControl style={{ width: '100%' }}>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                      value={filter.type}
                      onChange={handleChange}
                      inputProps={{
                        name: 'type',
                      }}
                    >
                      <MenuItem value="">Tudo</MenuItem>
                      <MenuItem value="article">Artigo</MenuItem>
                      <MenuItem value="book">Livro</MenuItem>
                      <MenuItem value="podcast">Podcast</MenuItem>
                      <MenuItem value="video">Vídeo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>

                  <FormControl style={{ width: '100%' }}>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      value={filter.category}
                      onChange={handleChange}
                      inputProps={{
                        name: 'category',
                      }}
                    >
                      <MenuItem value="" key="no-category">Todos</MenuItem>
                      {props.categories.allCategories.map(category => (
                        <MenuItem value={category._id} key={`category-${category._id}`}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="adornment-password">Buscar</InputLabel>
                    <Input
                      id="adornment-password"
                      value={search}
                      onChange={e => handleSearch(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>

        <Box my={3}>
          <Paper>
            {items && !isEmpty(items) ? (
              <React.Fragment>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Tipo</TableCell>
                      <TableCell align="left">Titulo</TableCell>
                      <TableCell align="left">Autor</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {items.map(item => (
                      <TableRow key={item._id}>
                        <TableCell align="left">
                          {item.type == "book" && (
                            <BookIcon />
                          )}
                          {item.type == "article" && (
                            <ArticleIcon />
                          )}
                        </TableCell>
                        <TableCell align="left">{item.title}</TableCell>
                        <TableCell align="left">{item.author}</TableCell>
                        <TableCell align="right">
                          <Link to={`/collection/${item.type}/edit/${item._id}`} >
                            <IconButton aria-label="Editar">
                              <EditIcon />
                            </IconButton>
                          </Link>

                          <IconButton aria-label="Delete" onClick={() => confirmDeletion(item)}>
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
                  rowsPerPage={20}
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
                  <Typography variant="body2">Nenhum item encontrado.</Typography>
                </Box>
              )}
          </Paper>
        </Box>
      </Container>
    </Template>
  )
}

const mapStateToProps = (state) => ({ items: state.collection.allItems, categories: state.categories })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllItems, deleteItem, fetchAllCategories }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Books)
