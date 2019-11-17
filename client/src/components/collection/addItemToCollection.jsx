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
  LibraryAdd as CollectionAddIcon,
  LibraryAddOutlined as NotCollectionAddIcon
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItemToCollection } from '../../actions/itemActions';

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
              <IconButton size="small" color="secondary" onClick={handleClickOpen}>
                <NotCollectionAddIcon />
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
