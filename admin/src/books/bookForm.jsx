/*
    Esta página está em construção e algumas coisas são temporárias
    O campo de capa e de links de download do livro será substituído futuramente por campos de upload
*/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, FieldArray, Form } from 'formik'
import { createBook, updateBook } from './booksAction'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';

const useStyles = () => makeStyles(theme => ({
    button: {
        margin: theme.spacing(8),
    },
    fieldSpacing: {
        marginBottom: '20px'
    }
}))


function BookForm(props) {
    const classes = useStyles()

    // Validação frontend do formulário
    const BookSchema = Yup.object().shape({
        title: Yup.string()
            .required('O campo título é obrigatório!'),
        author: Yup.string()
            .required('O campo autor é obrigatório!'),
    })

    const isNew = props.isNew
    const initialFormValues = { title: '', author: '', description: '', cover: '', download_options: [''], buy_links: [''] }

    return (
        <Formik
        initialValues={isNew ? initialFormValues : props.bookData}
        validationSchema={BookSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
            if(!values._id) {
                props.createBook(values);
                actions.resetForm(initialFormValues)
            } else {
              return props.updateBook(values);
            }
          }}

        render={(formikProps) => {
            const { values, touched, errors, handleChange, handleBlur } = formikProps;
            return (
                <Form encType="multipart/form-data">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className={classes.fieldSpacing}>
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
                                    <TextField
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                        label="Descrição"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.description && touched.description) && errors.description}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <Paper>
                                        Teste
                                </Paper>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                                        {(isNew) ? "Adicionar" : "Atualizar"}
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6" component="h2">
                                        Capa do Livro
                                    </Typography>

                                    <TextField
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                        label="Capa (link da imagem)"
                                        name="cover"
                                        value={values.cover}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.cover && touched.cover) && errors.cover}
                                    />
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ createBook, updateBook }, dispatch)
export default connect(null, mapDispatchToProps)(BookForm)
