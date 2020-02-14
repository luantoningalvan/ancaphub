import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import Hero from '../../components/template/hero';
import TitleComponent from '../../components/template/titleComponent';
import FullTable from '../../components/table/fullTable'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllCategories, editCategory } from '../../actions/categoryActions';

function Categories({ fetchAllCategories, editCategory, categories }) {
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
            <FullTable
              fields={[
                { label: "Nome", key: "name" },
                { label: "Slug", key: "slug", align: "left" },
              ]}
              data={categories.allCategories}
              actions={[
                { label: "Editar", icon: EditIcon, action: openEditionDialog },
                { label: "Deletar", icon: DeleteIcon }
              ]}
            />
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