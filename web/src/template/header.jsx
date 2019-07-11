import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AuthDialog from '../auth/authDialog'
import LoggedUserMenu from '../auth/loggedUserMenu'
import SearchBox from '../components/search/searchBox'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ width: '100%', display: "flex", flexDirection: 'row', alignContent: 'space-around' }}>
          <div style={{ display: "flex", alignItems: 'center', flexGrow: '1' }}>
            <IconButton
              color="inherit"
              aria-label="Abrir menu lateral"
              onClick={props.openDrawer}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              AncapHub
          </Typography>
          </div>

          <div style={{ flexGrow: '1' }}>
            <SearchBox />
          </div>

          <div style={{ flexGrow: '1', display: 'flex', justifyContent: "flex-end" }}>
            <div className={classes.sectionDesktop}>
              {!props.logged ? (
                <AuthDialog />
              ) : (
                <LoggedUserMenu />
              )}
            </div>
            <div className={classes.sectionMobile}>
              {!props.logged ? (
                <AuthDialog />
              ) : (
                <LoggedUserMenu />
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
