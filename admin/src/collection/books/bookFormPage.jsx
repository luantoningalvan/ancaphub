import React, { useEffect, useState } from 'react'
import Template from '../../template/template'
import BookForm from './bookForm'
import isEmpty from 'is-empty'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { prepareToCreateNewItem, fetchItem } from '../collectionActions'

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
      <BookForm
        isNew={isNew}
        bookData={props.book}
      />
    </Template>
  )
}

const mapStateToProps = (state) => ({ book: state.collection.item })
const mapDispatchToProps = (dispatch) => bindActionCreators({ prepareToCreateNewItem, fetchItem }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BookFormPage)
