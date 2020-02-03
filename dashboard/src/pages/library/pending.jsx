import React from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core/'
import Button from '@material-ui/core/Button';

import {
  Check as CheckIcon,
  Clear as ClearIcon
} from '@material-ui/icons';

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
