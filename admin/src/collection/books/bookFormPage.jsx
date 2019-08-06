import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { prepareToCreateNewItem, fetchItem } from '../collectionActions'
import Container from '@material-ui/core/Container'
import Template from '../../template/template'
import Hero from '../../template/hero'
import Box from '@material-ui/core/Box';
import BookForm from './bookForm'
import isEmpty from 'is-empty'

function BookFormPage(props) {
  const { id } = props.match.params;

  useEffect(() => {
    if (id) {
      props.fetchItem(id);
    } else {
      props.prepareToCreateNewItem();
    }
  }, [id]);

  const isNew = isEmpty(props.book)

  return (
    <Template>
      <Hero title={isNew ? "Adicionar Livro" : `Editar ${props.book.title}`} />

      <Box mt={3}>
        <Container>
          <BookForm
            isNew={isNew}
            bookData={props.book}
          />
        </Container>
      </Box>
    </Template>
  )
}

const mapStateToProps = (state) => ({ book: state.collection.item })
const mapDispatchToProps = (dispatch) => bindActionCreators({ prepareToCreateNewItem, fetchItem }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BookFormPage)
