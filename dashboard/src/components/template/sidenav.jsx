import React from 'react';
import {
  Drawer,
  List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
 Home as HomeIcon,
 Person as PersonIcon,
 ViewList as ViewListIcon,
 Folder as FolderIcon,
 Settings as SettingsIcon
} from '@material-ui/icons'
import MenuItem from '../template/menuItem';
import { withRouter } from 'react-router';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#021019',
    border: 'none'
  },
  toolbar: theme.mixins.toolbar
}));

const SideNav = props => {
  const classes = useStyles();
  const url = props.match.path;
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper
      }}>
      <div className={classes.toolbar} />
      <List disablePadding>
        <MenuItem
          selected={url === '/'}
          icon={<HomeIcon />}
          link="/"
          label="Dashboard"
        />
        <MenuItem
          selected={url.includes('/collection')}
          icon={<ViewListIcon />}
          link="/collection"
          label="Coleção"
        />
        <MenuItem
          selected={url.includes('/categories')}
          icon={<FolderIcon />}
          link="/categories"
          label="Categorias"
        />
        <MenuItem
          selected={url.includes('/users')}
          icon={<PersonIcon />}
          link="/users"
          label="Usuários"
        />
        <MenuItem
          selected={url.includes('/settings')}
          icon={<SettingsIcon />}
          link="/settings"
          label="Configurações"
        />
      </List>
    </Drawer>
  );
};

export default withRouter(SideNav);
