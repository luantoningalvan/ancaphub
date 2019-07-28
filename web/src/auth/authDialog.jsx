import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from './login'
import Signup from './signup'
import PersonIcon from '@material-ui/icons/Person'

export default function authDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <React.Fragment>
      <IconButton aria-label="Entrar" color="secondary" onClick={handleClickOpen}>
        <PersonIcon size="medium" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogContent>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Cadastro" />
            <Tab label="Entrar" />
          </Tabs>
          <SwipeableViews
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <Signup />
            <Login />
          </SwipeableViews>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
