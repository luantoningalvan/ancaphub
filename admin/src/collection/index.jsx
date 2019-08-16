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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputAdornment from '@material-ui/core/InputAdornment';
import BookIcon from '@material-ui/icons/Book'
import ArticleIcon from '@material-ui/icons/Description'
import VideoIcon from '@material-ui/icons/PlayArrow'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import isEmpty from 'is-empty'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAllItems, deleteItem, approveItem } from './collectionActions'
import { fetchAllCategories } from '../components/categories/categoriesAction'

function Books(props) {
  const { items, total } = props.items
  const [clientCurrentPage, setCurrentPage] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({ type: "", category: "" });
  const [status, changeStatus] = useState("published")
  const [search, handleSearch] = useState("")

  useEffect(() => props.fetchAllCategories(), []);
  useEffect(() => props.fetchAllItems(clientCurrentPage, filter, status), [clientCurrentPage, filter, status]);

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
        <Button variant="outlined" color="primary" aria-controls="add-item-options" aria-haspopup="true" onClick={handleClick}>
          <AddIcon style={{ marginRight: '5px' }} />
          Item
        </Button>
        <Menu
          id="add-item-options"
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
          <MenuItem component={Link} to="/collection/video/add">Vídeo</MenuItem>
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
                    <InputLabel htmlFor="search-item">Buscar</InputLabel>
                    <Input
                      id="search-item"
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
            <Tabs value={status} onChange={(e, value) => changeStatus(value)}>
              <Tab label="Publicados" value="published" />
              <Tab label="Rascunhos" value="draft" />
              <Tab label="Pendentes" value="pending" />
              <Tab label="Lixeira" value="deleted" />
            </Tabs>
            {items && !isEmpty(items) ? (
              <Box mt={1}>
                <Table size="small">
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
                          {item.type == "video" && (
                            <VideoIcon />
                          )}
                        </TableCell>
                        <TableCell align="left">{item.title}</TableCell>
                        <TableCell align="left">{item.author}</TableCell>
                        <TableCell align="right">
                          {item.status == 'published' && (
                            <Link to={`/collection/${item.type}/edit/${item._id}`} >
                              <IconButton aria-label="Editar">
                                <EditIcon />
                              </IconButton>
                            </Link>
                          )}
                          {item.status == 'published' && (
                            <IconButton aria-label="Delete" onClick={() => confirmDeletion(item)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                          {item.status == 'pending' && (
                            <>
                              <IconButton aria-label="Aprovar" onClick={() => props.approveItem(item._id)}>
                                <CheckIcon />
                              </IconButton>
                              <IconButton aria-label="Rejeitar" onClick={() => confirmDeletion(item)}>
                                <ClearIcon />
                              </IconButton>
                            </>
                          )}
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
              </Box>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllItems, deleteItem, approveItem, fetchAllCategories }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Books)
