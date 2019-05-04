import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik'
import { TextField, SimpleFileUpload } from 'formik-material-ui'
import { create } from './booksAction'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Template from '../template/template'
import Hero from '../template/hero'


function AddBook(props) {
    console.log(props)
    const useStyles = () => makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }))

    const classes = useStyles()

    return (
        <Template>
            <Hero title="Adicionar Livros" />
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
                                    <Form>
                                        <Grid item xs={12}>
                                            <Field
                                                name="title"
                                                label="Título"
                                                type="text"
                                                component={TextField}
                                                variant="outlined"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                name="author"
                                                label="Autor"
                                                type="text"
                                                variant="outlined"
                                                component={TextField}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                name="description"
                                                label="Descrição"
                                                type="textarea"
                                                variant="outlined"
                                                multiline
                                                component={TextField}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                name="cover"
                                                label="Capa do Livro"
                                                component={SimpleFileUpload}
                                            />
                                        </Grid>

                                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                                            Criar
                                        </Button>
                                        
                                    </Form>
                                )}
                        </Formik>
            </Container>
        </Template>
    )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create }, dispatch)
export default connect(null, mapDispatchToProps)(AddBook)

