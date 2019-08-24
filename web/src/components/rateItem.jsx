import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function AddItemToCollection(props) {
  return (
    <>
      {props.auth.isAuthenticated && (
        <Button size="small" color="primary">
          Avaliar
        </Button>
      )
      }
    </>
  )
}

const mapStateToProps = state => ({ auth: state.auth })
//const mapDispatchToProps = dispatch => bindActionCreators({ saveItem }, dispatch)

export default connect(mapStateToProps)(AddItemToCollection)