import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import { create } from './booksAction'

import Template from '../template/template'
import Hero from '../template/hero'
import Container from '../layout/container'
import Row from '../layout/row'
import Grid from '../layout/grid'

class AddBook extends Component {
    componentDidMount(){
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
    render() {
        return (
            <Template>
                <Hero title="Adicionar Livros" />
                <Container>
                    <Row>
                        <Grid col="12">
                            <Formik
                                initialValues={{ title: '', author: '', description: '', download_options: [''], buy_links: [''] }}
                                validate={values => {
                                    let errors = {};
                                    if (!values.title) {
                                        errors.title = 'Título necessário';
                                    } else if(!values.author){
                                        errors.author = 'Autor necessário';
                                    } 
                                    return errors;
                                }}
                                onSubmit={(values) => {
                                    this.props.create(values)
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
                                        
                                        <div className="input-field">
                                            <Field id="book_title" type="text" name="title" />
                                            <label htmlFor="book_title">Título do Livro</label>
                                            <ErrorMessage name="title" component="div" />
                                        </div>

                                        <div className="input-field">
                                            <Field id="book_author" type="text" name="author" />
                                            <label htmlFor="book_author">Autor do Livro</label>
                                            <ErrorMessage name="author" component="div" />
                                        </div>

                                        <div className="input-field">
                                            <Field component="textarea" className="materialize-textarea" id="book_description" name="description" />
                                            <label htmlFor="book_description">Descrição do Livro</label>
                                            <ErrorMessage name="description" component="div" />
                                        </div>

                                        <div className="file-field input-field">
                                            <div className="btn">
                                                <span>Carregar</span>
                                                <input type="file" />
                                            </div>

                                            <div className="file-path-wrapper">
                                                <Field className="file-path validate" placeholder="Carregar capa do Livro"  type="text" name="cover" />
                                            </div>
                                        </div>
                                        
                                        <h3>Opções de Compra</h3>
                                        <div className="buy_links">
                                            <div className="card">
                                            <FieldArray
                                                name="buy_links"
                                                render={arrayHelpers => (
                                                <div>
                                                    {values.buy_links.map((friend, index) => (
                                                    <div key={index}>
                                                        <Row>
                                                            <Grid cols="12 5">
                                                                <div className="input-field">
                                                                    <Field name={`buy_links[${index}].website_name`} placeholder="Nome do Site" type="text"/>
                                                                </div>
                                                            </Grid>

                                                            <Grid cols="12 5">
                                                                <div className="input-field">
                                                                    <Field name={`buy_links.${index}.website_link`} placeholder="Link" type="text"/>
                                                                </div>
                                                            </Grid>

                                                            <Grid cols="12 2">
                                                                <button className="btn btn-form-array-control" type="button" onClick={() => arrayHelpers.remove(index)}>
                                                                    <i className="material-icons">remove_circle_outline</i>
                                                                </button>
                                                                <button className="btn btn-form-array-control" type="button" onClick={() => arrayHelpers.push({ website_name: '', website_link: '' })}>
                                                                    <i className="material-icons">add_circle_outline</i>
                                                                </button>
                                                            </Grid>
                                                        </Row>
                                                    </div>
                                                    ))}
                                                </div>
                                                )}
                                            />
                                            </div>
                                        </div>

                                        <h3>Opções de Download</h3>
                                        <div className="download_options">
                                            <div className="card">
                                            <FieldArray
                                                name="download_options"
                                                render={arrayHelpers => (
                                                <div>
                                                    {values.download_options.map((friend, index) => (
                                                    <div key={index}>
                                                        <Row>
                                                            <Grid cols="12 5">
                                                            <div className="input-field">
                                                                <select>
                                                                <option value="" disabled selected>Selecione o formato</option>
                                                                <option value="1">PDF</option>
                                                                <option value="2">MOBI</option>
                                                                <option value="3">EPUB</option>
                                                                </select>
                                                                <label>Formato do Arquivo</label>
                                                            </div>
                                                            </Grid>

                                                            <Grid cols="12 5">
                                                            <div className="file-field input-field">
                                                                <div className="btn">
                                                                    <span><i className="material-icons">cloud_upload</i></span>
                                                                    <input type="file" />
                                                                </div>

                                                                <div className="file-path-wrapper">
                                                                    <Field className="file-path validate" placeholder="Carregar Livro"  type="text" name={`download_options[${index}].file`} />
                                                                </div>
                                                            </div>
                                                            </Grid>

                                                            <Grid cols="12 2">
                                                                <button className="btn  btn-form-array-control" type="button" onClick={() => arrayHelpers.remove(index)}>
                                                                    <i className="material-icons">remove_circle_outline</i>
                                                                </button>
                                                                <button className="btn btn-form-array-control" type="button" onClick={() => arrayHelpers.push({ website_name: '', website_link: '' })}>
                                                                    <i className="material-icons">add_circle_outline</i>
                                                                </button>
                                                            </Grid>
                                                        </Row>
                                                    </div>
                                                    ))}
                                                </div>
                                                )}
                                            />
                                            </div>
                                        </div>


                                        <button className="btn" type="submit" disabled={isSubmitting}>
                                            Adicionar Livro
                                        </button>
                                    </Form>    
                                )}
                            </Formik>

                        </Grid>
                    </Row>
                </Container>
            </Template>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create }, dispatch)
export default connect(null, mapDispatchToProps)(AddBook)

