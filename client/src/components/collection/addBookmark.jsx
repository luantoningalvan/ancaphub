import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  Bookmark as AddBookmarkIcon,
  BookmarkBorder as RemoveBookmarkIcon
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBookmark } from '../../actions/bookmarkActions';

function AddBookmark({item, auth, addBookmark}) {
  return (
    <>
      {auth.isAuthenticated && (
        <IconButton
          size="small"
          color="secondary"
          onClick={() => addBookmark(item._id, item.location)}>
          {item.hasSaved ? (
            <AddBookmarkIcon />
          ) : (
              <RemoveBookmarkIcon />
            )}
        </IconButton>
      )}
    </>
  );
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addBookmark }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBookmark);
