import React from 'react';
import {
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Box
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import Title from '../../../components/template/titleComponent'
import FileUpload from '../../../components/upload/fileUpload'
import ImageUpload from '../../../components/upload/imageUpload';
import ChooseCategory from '../../../components/categories/chooseCategory';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addItem } from '../../../actions/itemActions';

function AddBook(props) {
  // Validação frontend do formulário
  const BookSchema = Yup.object().shape({
    title: Yup.string().required('O campo título é obrigatório!'),
    author: Yup.string().required('O campo autor é obrigatório!'),
    downloadOptions: Yup.array().required()
  });

  const initialFormValues = {
    title: '',
    author: '',
    content: '',
    cover: '',
    downloadOptions: [],
    categories: []
  };

  return (
    <>
      <Title title="Adicionar Livro" />

      <Box mb={3}>
        <Typography variant="h4" component="h2">
          Adicionar Livro
        </Typography>
      </Box>

      <Formik
        initialValues={initialFormValues}
        validationSchema={BookSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          props.addItem(values, 'book');
          actions.resetForm(initialFormValues);
          actions.setStatus("sending")
        }}
        render={formikProps => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
          } = formikProps;

          return (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Título"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.title && touched.title && errors.title
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Autor(es)"
                        name="author"
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.author && touched.author && errors.author
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        multiline
                        variant="outlined"
                        fullWidth
                        label="Descrição"
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.content && touched.content && errors.content
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Paper>
                        <Box p={2}>
                          <Box mb={2}>
                            <Typography variant="h6">
                              Opções de Download
                            </Typography>
                          </Box>

                          <Field component={FileUpload} name='downloadOptions' />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h2">
                        Capa do Livro
                      </Typography>

                      <Field component={ImageUpload} name="cover" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h6" component="h2">
                        Categorias
                      </Typography>

                      <Box my={2}>
                        <Field component={ChooseCategory} name="categories" />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Adicionar
                      </Button>
                  <Button
                    component={Link}
                    to="/books"
                    color="inherit"
                    style={{ marginLeft: '10px' }}
                  >
                    Cancelar
                      </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      />
    </>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addItem }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(AddBook);
