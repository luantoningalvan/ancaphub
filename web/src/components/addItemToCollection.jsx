import React, { Fragment } from 'react'
import IconButton from '@material-ui/core/IconButton';
import CollectionAddIcon from '@material-ui/icons/LibraryAdd'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addItemToCollection } from '../auth/authActions'

function AddItemToCollection(props) {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState(true)

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function addAndPost(item) {
    props.addItemToCollection(item)
    handleClose()
  }

  function add(item) {
    props.addItemToCollection(item)
    handleClose()
  }

  return (
    <Fragment>
      {props.auth.isAuthenticated && (
        <Fragment>
          {props.auth.user.personalCollection.includes(props.item) ? (
            <IconButton size="small" color="secondary" onClick={() => props.addItemToCollection(props.item)}>
              <CollectionAddIcon />
            </IconButton>
          ) : (

              <IconButton size="small" color="primary" onClick={handleClickOpen}>
                <CollectionAddIcon />
              </IconButton>
            )}

          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Adicionar item à coleção</DialogTitle>
            <DialogContent>
              <DialogContentText>Deseja mesmo adicionar este item à sua coleção?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={() => addAndPost(props.item)} color="primary">
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
}


const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ addItemToCollection }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddItemToCollection)