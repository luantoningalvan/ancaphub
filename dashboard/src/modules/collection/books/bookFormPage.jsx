import React, { useEffect } from 'react';
import Template from '../../../template/template';
import BookForm from './bookForm';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearItem, fetchItem } from '../collectionActions';

function BookFormPage(props) {
  const { id } = props.match.params;

  useEffect(() => {
    if (id) {
      props.fetchItem(id);
    } else {
      props.clearItem();
    }
  }, [id]);

  const isNew = isEmpty(props.book);

  return (
    <Template>
      {!props.isLoading && (
        <BookForm isNew={isNew} bookData={props.book} />
      )}
    </Template>
  );
}

const mapStateToProps = state => ({ isLoading: state.collection.loading, book: state.collection.item });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearItem, fetchItem }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookFormPage);
