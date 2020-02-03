import React, { useEffect } from 'react';
import VideoForm from './videoForm';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearItem, fetchItem } from '../../../actions/collectionActions';

function VideoFormPage({fetchItem, clearItem, video, match}) {
  const { id } = match.params;

  useEffect(() => {
    if (id) {
      fetchItem(id);
    } else {
      clearItem();
    }
  }, [id, fetchItem, clearItem]);

  const isNew = isEmpty(video);

  return (
    <VideoForm isNew={isNew} videoData={video} />
  );
}

const mapStateToProps = state => ({ video: state.collection.item });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearItem, fetchItem }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoFormPage);
