import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  Box,
  Button
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import ChooseCategory from '../../../components/categories/chooseCategory';
import RichTextEditor from '../../../components/editor/richTextEditor';
import ImageUpload from '../../../components/upload/imageUpload';
import Title from '../../../components/template/titleComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addItem } from '../../../actions/itemActions';

function AddArticle(props) {
  // Validação frontend do formulário
  const ArticleSchema = Yup.object().shape({
    title: Yup.string().required('O campo título é obrigatório!'),
    author: Yup.string().required('O campo autor é obrigatório!'),
    content: Yup.string().required('O campo conteúdo é obrigatório!')
  });

  const initialFormValues = {
    title: '',
    author: '',
    content: '',
    cover: '',
    categories: []
  };

  return (
    <>
      <Title title="Adicionar Artigo" />
      <Box mb={3}>
        <Typography variant="h4" component="h2">
          Adicionar Artigo
        </Typography>
      </Box>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ArticleSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          props.addItem(values, 'article');
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
            <Form encType="multipart/form-data" autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
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
                      <Field component={RichTextEditor} name="content" />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h2">
                        Capa do Artigo
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
                    to="/articles"
                    color="inherit"
                    style={{ marginLeft: '10px' }}>
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
)(AddArticle);
