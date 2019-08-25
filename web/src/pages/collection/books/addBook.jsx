import React from 'react'
import Template from '../../../template/template'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import MuiLink from '@material-ui/core/Link';
import ChooseCategory from '../../../components/categories/chooseCategory'
import ImageUpload from '../../../components/imageUpload'
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addItem } from '../itemActions'
import { Formik, Field, FieldArray, getIn, Form } from 'formik'

function AddBook(props) {
  // Validação frontend do formulário
  const BookSchema = Yup.object().shape({
    title: Yup.string()
      .required('O campo título é obrigatório!'),
    author: Yup.string()
      .required('O campo autor é obrigatório!'),
    downloadOptions: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string()
            .required("O campo tipo é obrigatório!"),
          file: Yup.string()
            .required("O campo arquivo é obrigatório!")
        })
      )
      .ensure()
      .required('É necessário pelo menos uma opção de download!')

  })

  const initialFormValues = {
    title: '',
    author: '',
    content: '',
    cover: '',
    downloadOptions: null,
    categories: [],
  }

  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">Adicionar Livro</Typography>
      </Box>

      <Formik
        initialValues={initialFormValues}
        validationSchema={BookSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          props.addItem(values, "book");
          actions.resetForm(initialFormValues)
        }}

        render={(formikProps) => {
          const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formikProps;
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
                      <TextField
                        multiline
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
                      <Paper>
                        <Box p={2}>
                          <Box mb={2}>
                            <Typography variant="h6">
                              Opções de Download
                              </Typography>
                          </Box>

                          <FieldArray
                            name="downloadOptions"
                            render={arrayHelpers => (
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  {values.downloadOptions != null && values.downloadOptions.map((download, index) => (
                                    <div key={index}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={5}>
                                          <FormControl fullWidth>
                                            <InputLabel htmlFor="age-simple">Formato</InputLabel>
                                            <Select
                                              value={values.downloadOptions[index].type || ""}
                                              onChange={(event) => { setFieldValue(`downloadOptions.${index}.type`, event.target.value) }}
                                              inputProps={{ name: `downloadOptions.${index}.type` }}
                                            >
                                              <MenuItem value={"pdf"}>PDF</MenuItem>
                                              <MenuItem value={"mobi"}>MOBI</MenuItem>
                                              <MenuItem value={"epub"}>EPUB</MenuItem>
                                            </Select>
                                            <FormHelperText>{(getIn(errors, `downloadOptions.${index}.type`) && getIn(touched, `downloadOptions.${index}.type`)) ? getIn(errors, `downloadOptions.${index}.type`) : ""}</FormHelperText>
                                          </FormControl>
                                        </Grid>

                                        <Grid item xs={5}>
                                          <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Link do Download"
                                            name={`downloadOptions.${index}.file`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin="dense"
                                            value={values.downloadOptions[index].file}
                                            helperText={(getIn(errors, `downloadOptions.${index}.file`) && getIn(touched, `downloadOptions.${index}.file`)) && getIn(errors, `downloadOptions.${index}.file`)}
                                          />
                                        </Grid>

                                        <Grid item xs={2}>
                                          <IconButton
                                            onClick={() => arrayHelpers.remove(index)}
                                            color="primary"
                                            aria-label="Remover Opção de Download"
                                          >
                                            <RemoveIcon />
                                          </IconButton>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  ))}
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography>
                                    <MuiLink href='javascript:;' onClick={() => arrayHelpers.push({ type: 'pdf', file: '' })}>
                                      + Adicionar
                                      </MuiLink>
                                  </Typography>
                                  {typeof errors.downloadOptions === 'string' ? <p>{errors.downloadOptions}</p> : null}
                                </Grid>
                              </Grid>
                            )}
                          />
                        </Box>
                      </Paper>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ addItem }, dispatch)

export default connect(null, mapDispatchToProps)(AddBook)
