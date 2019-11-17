import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Template from '../../template/template';
import Hero from '../../template/hero';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import isEmpty from 'is-empty'
import TitleComponent from '../../components/titleComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllCategories, editCategory } from '../../components/categories/categoriesAction';

function Categories(props) {
  useEffect(() => props.fetchAllCategories(), []);
  const [open, setOpen] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState({});

  const handleClick = () => {
    setOpen(state => !state);
  }

  const handleChange = name => event => {
    setCategoryData({ ...categoryData, [name]: event.target.value });
  };

  const openEditionDialog = (category) => {
    setCategoryData(category)
    handleClick()
  }

  const editCategory = () => {
    props.editCategory(categoryData)
    handleClick()
  }

  return (
    <Template>
      <TitleComponent title="Categorias" />
      <Hero title="Categorias" />
      <Box my={3}>
        <Container>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isEmpty(props.categories.allCategories) && props.categories.allCategories.map(category => (
                  <TableRow key={category._id}>
                    <TableCell>
                      {category.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="Editar" onClick={() => openEditionDialog(category)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                      >
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

      <Dialog open={open} onClose={handleClick} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Categoria</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            value={categoryData.name}
            onChange={handleChange('name')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancelar
          </Button>
          <Button onClick={editCategory} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </Template>
  );
}

const mapStateToProps = state => ({
  categories: state.categories
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchAllCategories, editCategory },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Categories)