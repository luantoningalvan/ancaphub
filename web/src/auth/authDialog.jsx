import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from './login'
import Signup from './signup'

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
            <Button aria-label="Entrar" color="secondary" onClick={handleClickOpen}>
                Entrar
            </Button>
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
                        <Tab label="Entrar" />
                        <Tab label="Cadastro" />
                    </Tabs>
                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <Login />
                        <Signup />
                    </SwipeableViews>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
