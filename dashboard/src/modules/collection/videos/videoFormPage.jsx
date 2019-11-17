import React, { useEffect } from 'react';
import Template from '../../../template/template';
import VideoForm from './videoForm';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearItem, fetchItem } from '../collectionActions';

function VideoFormPage(props) {
  const { id } = props.match.params;

  useEffect(() => {
    if (id) {
      props.fetchItem(id);
    } else {
      props.clearItem();
    }
  }, [id]);

  const isNew = isEmpty(props.video);

  return (
    <Template>
      <VideoForm isNew={isNew} videoData={props.video} />
    </Template>
  );
}

const mapStateToProps = state => ({ video: state.collection.item });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearItem, fetchItem }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoFormPage);
