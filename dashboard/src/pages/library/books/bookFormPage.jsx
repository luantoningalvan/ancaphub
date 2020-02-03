import React, { useEffect } from 'react';
import BookForm from './bookForm';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearItem, fetchItem } from '../../../actions/collectionActions';

function BookFormPage({fetchItem, clearItem, book,isLoading, match}) {
  const { id } = match.params;

  useEffect(() => {
    if (id) {
      fetchItem(id);
    } else {
      clearItem();
    }
  }, [id, fetchItem, clearItem]);

  const isNew = isEmpty(book);

  return (
    <>
      {!isLoading && (
        <BookForm isNew={isNew} bookData={book} />
      )}
    </>
  );
}

const mapStateToProps = state => ({ isLoading: state.collection.loading, book: state.collection.item });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearItem, fetchItem }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookFormPage);
