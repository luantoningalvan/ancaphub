import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Hidden,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Menu from './menu';
import SearchBox from '../search/searchBox';
import UserMenu from '../auth/userMenu';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  title: {
    color: 'white',
    fontWeight: 'bold'
  },
  menuButton: {
    marginRight: 10
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  paper: {
    background: theme.palette.primary.main
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <>
      <Hidden mdUp implementation="css">
        <AppBar position="fixed" >

          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} variant="h6" noWrap>
              ancaphub
            </Typography>

            <div
              style={{
                flexGrow: '1',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <UserMenu />
            </div>
          </Toolbar>
        </AppBar>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: true,
            [classes.drawerClose]: !true
          })}
          classes={{
            paper: clsx(classes.paper, {
              [classes.drawerOpen]: true,
              [classes.drawerClose]: !true
            })
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Box display="flex" alignItems="center" width="100%" height="100%">
            <div style={{ flexGrow: 1 }}>
              <Box id="search" px={2} my={1}>
                <SearchBox />
              </Box>
              <Menu />
            </div>
          </Box>
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: true,
            [classes.drawerClose]: !true
          })}
          classes={{
            paper: clsx(classes.paper, {
              [classes.drawerOpen]: true,
              [classes.drawerClose]: !true
            })
          }}
          open={true}>
          <Box id="header" px={2} mt={1} display="flex" alignItems="center">
            <Typography className={classes.title} variant="h6" noWrap>
              ancaphub
            </Typography>

            <div
              style={{
                flexGrow: '1',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <UserMenu />
            </div>
          </Box>
          <Box id="search" px={2} my={1}>
            <SearchBox />
          </Box>
          <Menu />
        </Drawer>
      </Hidden>
    </>

  );
}

