import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import isEmpty from 'is-empty'
import Hero from '../../components/template/hero';
import TitleComponent from '../../components/template/titleComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllCategories, editCategory } from '../../actions/categoryActions';

function Categories({fetchAllCategories, editCategory, categories}) {
  useEffect(() => fetchAllCategories(), [fetchAllCategories]);
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

  const handleEditCategory = () => {
    editCategory(categoryData)
    handleClick()
  }

  return (
    <>
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
                {!isEmpty(categories.allCategories) && categories.allCategories.map(category => (
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
          <Button onClick={handleEditCategory} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </>
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