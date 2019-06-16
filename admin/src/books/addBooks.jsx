import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik'
import { create } from './booksAction'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Template from '../template/template'
import Hero from '../template/hero'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';

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
    fieldSpacing: {
        marginBottom: '20px'
    }
}))



function AddBook(props) {
    useEffect(() => {
        document.title = 'Adicionar Livro'
    })
    const classes = useStyles()

    // Validação frontend do formulário
    const AddBookSchema = Yup.object().shape({
        title: Yup.string()
            .required('O campo título é obrigatório!'),
        author: Yup.string()
            .required('O campo autor é obrigatório!'),
    });

    return (
        <Template>
            <Hero title="Adicionar Livros" className={classes.fieldSpacing} />

            <Box mt={3}>
                <Container>
                    <Formik
                        initialValues={{ title: '', author: '', description: '', cover: null, download_options: [''], buy_links: [''] }}
                        validationSchema={AddBookSchema}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                console.log(values);
                                actions.setSubmitting(false);
                            }, 1000);
                        }}

                        render={(props) => {
                            const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;

                            return (
                                <Form encType="multipart/formdata">
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
                                                    <Typography variant="h6" component="h2">
                                                        Capa do Livro
                                                </Typography>

                                                    <input id="file" name="cover" type="file" onChange={(e) => {
                                                        console.log(e.target.files[0])
							setFieldValue("cover", e.target.files[0])
                                                    }} className="form-control" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                                        Criar
                                </Button>
                                </Form>
                            )
                        }}
                    />
                </Container>
            </Box>
        </Template>
    )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create }, dispatch)
export default connect(null, mapDispatchToProps)(AddBook)

