import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

/* Componentes */
import Header from './header';
import Main from './main';
import SideNav from './sidenav';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#fbc02d'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  }
}));

export default props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleDrawer() {
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header handleDrawer={handleDrawer} open={open} />
        <SideNav open={open} />
        <Main open={open}>{props.children}</Main>
      </div>
    </ThemeProvider>
  );
};
