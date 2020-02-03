import React, { useEffect } from 'react';
import ArticleForm from './articleForm';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearItem, fetchItem } from '../../../actions/collectionActions';

function ArticleFormPage({fetchItem, clearItem, article, match}) {
  const { id } = match.params;

  useEffect(() => {
    if (id) {
      fetchItem(id);
    } else {
      clearItem();
    }
  }, [id, fetchItem, clearItem]);

  const isNew = isEmpty(article);

  return (
      <ArticleForm isNew={isNew} articleData={article} />
  );
}

const mapStateToProps = state => ({ article: state.collection.item });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearItem, fetchItem }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleFormPage);
