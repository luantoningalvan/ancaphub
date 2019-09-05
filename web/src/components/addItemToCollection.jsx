import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CollectionAddIcon from '@material-ui/icons/LibraryAdd';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItemToCollection } from '../pages/collection/itemActions';

function AddItemToCollection(props) {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState(true);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function add(item) {
    props.addItemToCollection(item, post);
    handleClose();
  }

  return (
    <Fragment>
      {props.auth.isAuthenticated && (
        <Fragment>
          {props.auth.user.personalCollection.includes(props.item) ? (
            <IconButton
              size="small"
              color="secondary"
              onClick={() => props.addItemToCollection(props.item)}>
              <CollectionAddIcon />
            </IconButton>
          ) : (
            <IconButton size="small" color="primary" onClick={handleClickOpen}>
              <CollectionAddIcon />
            </IconButton>
          )}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              Adicionar item à coleção
            </DialogTitle>
            <DialogContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={post}
                    onChange={e => setPost(e.target.checked)}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Criar Publicação"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={() => add(props.item)} color="primary">
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addItemToCollection }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemToCollection);
