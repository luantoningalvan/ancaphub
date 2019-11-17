import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  Bookmark as SaveIcon,
  BookmarkBorder as NotSaveIcon
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveItem } from '../../actions/itemActions';

function AddItemToCollection(props) {
  return (
    <>
      {props.auth.isAuthenticated && (
        <IconButton
          size="small"
          color="secondary"
          onClick={() => props.saveItem(props.item)}>
          {props.auth.user.saved && props.auth.user.saved.includes(props.item) ? (
            <SaveIcon />
          ) : (
              <NotSaveIcon />
            )}
        </IconButton>
      )}
    </>
  );
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemToCollection);
