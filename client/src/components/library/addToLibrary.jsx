import React, { Fragment } from 'react';
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import {
  LibraryAdd as RemoveFromLibraryIcon,
  LibraryAddOutlined as AddToLibraryIcon
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToLibrary } from '../../actions/itemActions';

function AddToLibrary({auth, item, addToLibrary}) {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState(true);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function add() {
    addToLibrary(item._id, post, item.location);
    handleClose();
  }

  return (
    <Fragment>
      {auth.isAuthenticated && (
        <Fragment>
          {item.inLibrary ? (
            <IconButton
              size="small"
              color="secondary"
              onClick={() => addToLibrary(item._id, false, item.location)}>
              <RemoveFromLibraryIcon />

            </IconButton>
          ) : (
              <IconButton size="small" color="secondary" onClick={handleClickOpen}>
                <AddToLibraryIcon />
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
                    color="default"
                  />
                }
                label="Criar Publicação"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Cancelar
              </Button>
              <Button onClick={add} color="secondary" variant="outlined">
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
  bindActionCreators({ addToLibrary }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToLibrary);
