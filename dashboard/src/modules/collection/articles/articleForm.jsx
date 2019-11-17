import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Container from '@material-ui/core/Container';
import ChooseCategory from '../../../components/categories/chooseCategory';
import RichTextEditor from '../../../components/editor/RichTextEditor';
import ImageUpload from '../../../components/imageUpload';
import Hero from '../../../template/hero';
import TitleComponent from '../../../components/titleComponent';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createItem, updateItem } from '../collectionActions';

function ArticleForm(props) {
  // Validação frontend do formulário
  const ArticleSchema = Yup.object().shape({
    title: Yup.string().required('O campo título é obrigatório!'),
    author: Yup.string().required('O campo autor é obrigatório!'),
    content: Yup.string().required('O campo conteúdo é obrigatório!')
  });

  const isNew = props.isNew;
  const initialFormValues = {
    title: '',
    author: '',
    content: '',
    cover: null,
    categories: []
  };

  return (
    <Formik
      initialValues={isNew ? initialFormValues : props.articleData}
      validationSchema={ArticleSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        if (!values._id) {
          props.createItem(values, 'article');
          actions.resetForm(initialFormValues);
        } else {
          return props.updateItem(values, 'article');
        }
      }}
      render={formikProps => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldValue
        } = formikProps;
        return (
          <Form encType="multipart/form-data" autoComplete="off">
            <TitleComponent title={
              isNew ? 'Adicionar Artigo' : `Editar: ${props.articleData.title}`
            } />
            <Hero
              title={
                isNew ? 'Adicionar Artigo' : `Editar: ${props.articleData.title}`
              }>
              <Link to={`/collection`}>
                <IconButton style={{ marginRight: '10px' }}>
                  <CancelIcon />
                </IconButton>
              </Link>
              <Button variant="contained" color="primary" type="submit">
                {isNew ? 'Adicionar' : 'Atualizar'}
              </Button>
            </Hero>
            <Box mt={3}>
              <Container>
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
                </Grid>
              </Container>
            </Box>
          </Form >
        );
      }}
    />
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createItem, updateItem }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(ArticleForm);
