import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import Container from '@material-ui/core/Container';
import ChooseCategory from '../../../components/categories/chooseCategory';
import ImageUpload from '../../../components/imageUpload';
import FileUpload from '../../../components/fileUpload';
import Hero from '../../../template/hero';
import TitleComponent from '../../../components/titleComponent';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createItem, updateItem, clearItem } from '../collectionActions';

function BookForm(props) {
  // Validação frontend do formulário
  const BookSchema = Yup.object().shape({
    title: Yup.string().required('O campo título é obrigatório!'),
    author: Yup.string().required('O campo autor é obrigatório!'),
    downloadOptions: Yup.array().required('Você precis adicionar ao menos uma opção de download!')
  })

  const isNew = props.isNew;
  const initialFormValues = {
    title: props.bookData.title || '',
    author: props.bookData.author || '',
    content: props.bookData.content || '',
    cover: props.bookData.cover || null,
    downloadOptions: props.bookData.extraFields && props.bookData.extraFields.downloadOptions
      ? props.bookData.extraFields.downloadOptions
      : [],
    categories: props.bookData.categories || [],
    _id: props.bookData._id || null
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={BookSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        if (values._id == null) {
          props.createItem(values, 'book');
          actions.resetForm(initialFormValues);
          actions.setStatus("sending")
        } else {
          return props.updateItem(values, 'book');
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
            <TitleComponent
              title={
                isNew ? 'Adicionar Livro' : `Editar: ${props.bookData.title}`
              } />
            <Hero
              title={
                isNew ? 'Adicionar Livro' : `Editar: ${props.bookData.title}`
              } >
              <Link to={`/collection`} onClick={() => props.clearItem()}>
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

                            <Field component={FileUpload} name="downloadOptions" />
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
  bindActionCreators({ createItem, updateItem, clearItem }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(BookForm);
