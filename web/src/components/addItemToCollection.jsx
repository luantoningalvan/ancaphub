import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import CollectionAddIcon from '@material-ui/icons/LibraryAdd'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addItemToCollection } from '../auth/authActions'

function AddItemToCollection(props) {
  return (
    <>
      {props.auth.isAuthenticated && (
        <IconButton size="small" color={props.auth.user.personalCollection.includes(props.item) ? "secondary" : "primary"} onClick={() => props.addItemToCollection(props.item)}>
          <CollectionAddIcon />
        </IconButton>
      )
      }
    </>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ addItemToCollection }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddItemToCollection)