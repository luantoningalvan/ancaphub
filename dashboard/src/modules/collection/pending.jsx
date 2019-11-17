import React from 'react';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function RejectPending({ item }) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <IconButton aria-label="Rejeitar" onClick={handleClickOpen}>
        <ClearIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Reprovar "{item.title}"
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Reprovar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function Pending({ approveItem, item }) {
  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton
        aria-label="Aprovar"
        onClick={() => approveItem(item._id)}>
        <CheckIcon />
      </IconButton>
      <RejectPending item={item} />
    </Box>
  );
}
