import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Rating from '@material-ui/lab/Rating';
import DialogTitle from '@material-ui/core/DialogTitle';
import RateIcon from '@material-ui/icons/RateReview'
import Box from '@material-ui/core/Box'

export default function Ratings(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Box>
        <Typography variant="h6" component="h3">Avaliações</Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          Nenhuma avaliação disponível
        </Box>

        <Box display="flex" justifyContent="center">
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            <RateIcon style={{ marginRight: '10px' }} />
            Avaliar
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="xs">
        <DialogTitle id="form-dialog-title">Avaliar {props.item.title}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              size="large"
            />
          </Box>
          <TextField
            multiline
            rows="5"
            id="name"
            label="Deixe um comentário"
            type="email"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Avaliar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}