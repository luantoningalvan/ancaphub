import React from 'react'
import Template from '../../../template/template'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import ReactPlayer from 'react-player'
import ChooseCategory from '../../../components/categories/chooseCategory'
import ImageUpload from '../../../components/imageUpload'
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addItem } from '../itemActions'
import { Formik, Field, Form } from 'formik'

function AddVideo(props) {
  // Validação frontend do formulário
  const VideoSchema = Yup.object().shape({
    title: Yup.string()
      .required('O campo título é obrigatório!'),
    videoUrl: Yup.string()
      .required('O campo vídeo é obrigatório!'),
  })

  const initialFormValues = {
    title: '',
    author: '',
    content: '',
    cover: '',
    videoUrl: '',
    categories: [],
  }

  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">Adicionar Vídeo</Typography>
      </Box>

      <Formik
        initialValues={initialFormValues}
        validationSchema={VideoSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          props.addItem(values);
          actions.resetForm(initialFormValues)
        }}

        render={(formikProps) => {
          const { values, touched, errors, handleChange, handleBlur } = formikProps;
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
                        fullWidth
                        label="Participante(s)"
                        name="author"
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.author && touched.author) && errors.author}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        label="Descrição"
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.content && touched.content) && errors.content}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Url do vídeo"
                        name="videoUrl"
                        value={values.videoUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.videoUrl && touched.videoUrl) && errors.videoUrl}
                      />
                    </Grid>

                    {values.videoUrl != "" && (
                      <Grid item xs={12}>
                        <ReactPlayer
                          url={values.videoUrl}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit">
                        Adicionar
                      </Button>
                      <Button component={Link} to="/videos" color="inherit" style={{ marginLeft: "10px" }}>
                        Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h2">
                        Capa do Video
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ addItem }, dispatch)

export default connect(null, mapDispatchToProps)(AddVideo)
