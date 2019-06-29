import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { prepareToCreateNewArticle, fetchArticle } from './articleActions'
import Container from '@material-ui/core/Container'
import Template from '../template/template'
import Hero from '../template/hero'
import Box from '@material-ui/core/Box';
import ArticleForm from './articleForm'
import isEmpty from 'is-empty'

function ArticleFormPage(props) {
    const { id } = props.match.params;

    useEffect( () => {
        if (id) {
            props.fetchArticle(id);
        } else{
            props.prepareToCreateNewArticle();
        }
    }, [id]);

    const isNew = isEmpty(props.article)

    return (
        <Template>
            <Hero title={isNew ? "Adicionar Artigo" : `Editar ${props.article.title}`} />

            <Box mt={3}>
                <Container>
                    <ArticleForm
                        isNew={isNew}
                        articleData={props.article}
                    />
                </Container>
            </Box>
        </Template>
    )
}

const mapStateToProps = (state) => ({article: state.articles.article})
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchArticle, prepareToCreateNewArticle }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ArticleFormPage)
