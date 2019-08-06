/*
    Esta página está em construção e algumas coisas são temporárias
    O campo de capa do artigo será substituído futuramente por campos de upload
*/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Field, Form } from 'formik'
import { createItem, updateItem } from '../collectionActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import * as Yup from 'yup';
import ChooseCategory from '../../components/categories/chooseCategory'
import RichTextEditor from '../../components/editor/RichTextEditor'
import ImageUpload from '../../components/imageUpload/imageUpload'

const useStyles = makeStyles(theme => ({
  imagePreview: {
    overflow: "hidden",
  }
}))

function ArticleForm(props) {
  const classes = useStyles()

  // Validação frontend do formulário
  const ArticleSchema = Yup.object().shape({
    title: Yup.string()
      .required('O campo título é obrigatório!'),
    author: Yup.string()
      .required('O campo autor é obrigatório!'),
    content: Yup.string()
      .required('O campo conteúdo é obrigatório!'),

  })

  const isNew = props.isNew
  const initialFormValues = { title: '', author: '', content: '', cover: '', categories: [] }

  return (
    <Formik
      initialValues={isNew ? initialFormValues : props.articleData}
      validationSchema={ArticleSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        if (!values._id) {
          props.createItem(values, 'article');
          actions.resetForm(initialFormValues)
        } else {
          return props.updateItem(values, 'article');
        }
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
                </Grid>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth type="submit">
                      {(isNew) ? "Adicionar" : "Atualizar"}
                    </Button>
                  </Grid>

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
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ createItem, updateItem }, dispatch)
export default connect(null, mapDispatchToProps)(ArticleForm)
