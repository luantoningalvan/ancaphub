import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'material-design-icons/iconfont/material-icons.css'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

/* Componentes */
import Header from './header'
import Main from './main'
import SideNav from './sidenav'


const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#000',
        },
        secondary: {
            main: '#fbc02d',
        },
      },
});

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    }
}));

export default props => {
    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();
    

    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <CssBaseline />
            <Header openDrawer={handleDrawerOpen} closeDrawer={handleDrawerClose} open={open}/>
            <SideNav open={open} />
            <Main open={open}>
                {props.children}
            </Main>
        </div>
        </ThemeProvider>
    );
}

