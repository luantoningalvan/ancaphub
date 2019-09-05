import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/SaveAlt';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveItem } from '../pages/collection/itemActions';

function AddItemToCollection(props) {
  return (
    <>
      {props.auth.isAuthenticated && (
        <IconButton
          size="small"
          color={
            props.auth.user.saved && props.auth.user.saved.includes(props.item)
              ? 'secondary'
              : 'primary'
          }
          onClick={() => props.saveItem(props.item)}>
          <SaveIcon />
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
