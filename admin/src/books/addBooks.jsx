import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik'
import { TextField, SimpleFileUpload } from 'formik-material-ui'
import { create } from './booksAction'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Template from '../template/template'
import Hero from '../template/hero'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';

const useStyles = () => makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(8),
    },
    input: {
        display: 'none',
    },
    fieldSpacing:{
        marginBottom:'20px'
    }
}))



function AddBook(props) {
    useEffect(() => {
        document.title = 'Adicionar Livro'
    })
    const classes = useStyles()

    return (
        <Template>
            <Hero title="Adicionar Livros" className={classes.fieldSpacing} />
            
            <Box mt={3}>
            <Container>
                <Formik
                    initialValues={{ title: '', author: '', description: '', download_options: [''], buy_links: [''] }}
                    validate={values => {
                        let errors = {};
                        if (!values.title) {
                            errors.title = 'Título necessário';
                        } else if (!values.author) {
                            errors.author = 'Autor necessário';
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        props.create(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                            
                            <Form encType="multipart/formdata">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={9}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} className={classes.fieldSpacing}>
                                                <Field
                                                    name="title"
                                                    label="Título"
                                                    type="text"
                                                    component={TextField}
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Field
                                                    name="author"
                                                    label="Autor"
                                                    type="text"
                                                    variant="outlined"
                                                    component={TextField}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Field
                                                    name="description"
                                                    label="Descrição"
                                                    type="textarea"
                                                    variant="outlined"
                                                    multiline
                                                    rows="4"
                                                    component={TextField}
                                                    fullWidth
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
                                            <Typography variant="h5" component="h2">
                                                Capa do Livro
                                            </Typography>
                                            <Grid item xs={12}>
                                                <Field
                                                    name="cover"
                                                    label="Capa do Livro"
                                                    component={SimpleFileUpload}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">
                    Criar
                </Button>
                            </Form>
                        )}
                </Formik>
            </Container>
            </Box>
        </Template>
    )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create }, dispatch)
export default connect(null, mapDispatchToProps)(AddBook)

