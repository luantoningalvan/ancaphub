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
  DialogTitle,
  IconButton,
  Typography
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
import { fetchAllCategories, editCategory, createCategory, deleteCategory } from '../../actions/categoryActions';

function Categories({ fetchAllCategories, createCategory, editCategory, deleteCategory, categories }) {
  useEffect(() => fetchAllCategories(), [fetchAllCategories]);
  const [open, setOpen] = React.useState(false);
  const [editCategoryData, setEditCategoryData] = React.useState({});
  const [newCategoryData, setNewCategoryData] = React.useState({});

  // Edição de categoria
  const handleChangeEdit = name => event => {
    setEditCategoryData({ ...editCategoryData, [name]: event.target.value });
  };

  const handleClick = () => {
    setOpen(state => !state);
  }

  const openEditionDialog = (category) => {
    setEditCategoryData(category)
    handleClick()
  }

  const handleEditCategory = () => {
    editCategory(editCategoryData)
    handleClick()
  }

  // Criação de categoria
  const handleChangeNew = name => event => {
    setNewCategoryData({ ...newCategoryData, [name]: event.target.value });
  };



  const handleNewCategory = (e) => {
    e.preventDefault()
    createCategory(newCategoryData)
    setNewCategoryData({name: "", slug: ""})
  }

  // Deleção de categoria
  const handleDeleteCategory = (id) => {
    const confirm = window.confirm("Você realmente deseja excluir esta categoria?")

    if(confirm){
      deleteCategory(id)
    }
  }

  return (
    <>
      <TitleComponent title="Categorias" />
      <Hero title="Categorias" />
      <Box my={3}>
        <Container>
          <Box mb={2}>
            <Paper>
              <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="body1">Adicionar Categoria:</Typography>
                <form style={{ display:"flex", alignItems:"center"}}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="name-new"
                  label="Nome"
                  type="text"
                  value={newCategoryData.name}
                  onChange={handleChangeNew('name')}
                   style={{marginRight:10}}
                  />
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="slug-new"
                  label="Slug"
                  type="text"
                  value={newCategoryData.slug}
                  onChange={handleChangeNew('slug')}
                   style={{marginRight:10}}
                  />
                  <Button 
                  type="submit" 
                  onClick={handleNewCategory}
                  variant="contained"
                  color="secondary"
                  disableElevation
                  >
                    Adicionar
                    </Button>
                  </form>
              </Box>
            </Paper>
          </Box>
          <Paper>
            <FullTable
              fields={[
                { label: "Nome", key: "name" },
                { label: "Slug", key: "slug", align: "left" },
              ]}
              data={categories.allCategories}
              actions={(category) =>
                <>
                  <IconButton onClick={() => openEditionDialog(category)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteCategory(category._id)}><DeleteIcon /></IconButton>
                </>
              }
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
            value={editCategoryData.name}
            onChange={handleChangeEdit('name')}
          />
          <TextField
            autoFocus
            margin="dense"
            id="slug"
            label="Slug"
            type="text"
            fullWidth
            value={editCategoryData.slug}
            onChange={handleChangeEdit('slug')}
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
    { fetchAllCategories, editCategory, deleteCategory, createCategory },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Categories)