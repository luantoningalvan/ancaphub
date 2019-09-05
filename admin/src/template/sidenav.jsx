import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '../template/menuItem';
import { withRouter } from 'react-router';

// Icones
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
          selected={url == '/'}
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
