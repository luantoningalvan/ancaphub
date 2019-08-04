import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addItemToLibrary } from '../auth/authActions'

function AddItemToLibrary(props) {
  return (
    <>
      {props.auth.isAuthenticated && (
        <IconButton size="small" color={props.auth.user.personalCollection.includes(props.item) ? "secondary" : "primary"} onClick={() => props.addItemToLibrary(props.item)}>
          <LibraryAddIcon />
        </IconButton>
      )
      }
    </>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ addItemToLibrary }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddItemToLibrary)