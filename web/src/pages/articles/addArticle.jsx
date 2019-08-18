import React from 'react'
import Template from '../../template/template'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import ChooseCategory from '../../components/categories/chooseCategory'
import RichTextEditor from '../../components/editor/RichTextEditor'
import ImageUpload from '../../components/imageUpload'
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addArticle } from './articleActions'
import { Formik, Field, Form } from 'formik'

function AddArticle(props) {
  // Validação frontend do formulário
  const ArticleSchema = Yup.object().shape({
    title: Yup.string()
      .required('O campo título é obrigatório!'),
    author: Yup.string()
      .required('O campo autor é obrigatório!'),
    content: Yup.string()
      .required('O campo conteúdo é obrigatório!'),

  })

  const initialFormValues = {
    title: '',
    author: '',
    content: '',
    cover: '',
    categories: [],
  }

  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">Adicionar Artigo</Typography>
      </Box>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ArticleSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          props.addArticle(values);
          actions.resetForm(initialFormValues)
        }}

        render={(formikProps) => {
          const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formikProps;
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
                        helperText={(errors.title && touched.title) && errors.title}
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
                        helperText={(errors.author && touched.author) && errors.author}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field component={RichTextEditor} name="content" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit">
                        Adicionar
                      </Button>
                      <Button component={Link} to="/livros" color="inherit" style={{ marginLeft: "10px" }}>
                        Cancelar
                      </Button>
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
            </Form>

          )
        }}
      />
    </Template>
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ addArticle }, dispatch)

export default connect(null, mapDispatchToProps)(AddArticle)
