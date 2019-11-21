import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  icon: {
    minWidth: '40px'
  },
  menuItem: {
    fontWeight: 'bold'
  },
  selected: {
    color: theme.palette.secondary.main
  },
  notSelected: {
    color: theme.palette.text.primary
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <ListItem
      button className={props.nested ? classes.nested : null}
      component={Link}
      to={props.link}

    >
      <ListItemIcon
        classes={{
          root: clsx(classes.icon, {
            [classes.selected]: props.selected,
            [classes.notSelected]: !props.selected
          })
        }}>
        {props.icon}
      </ListItemIcon>
      <ListItemText
        primary={props.label}
        classes={{
          root: clsx(classes.menuItem, {
            [classes.selected]: props.selected,
            [classes.notSelected]: !props.selected
          })
        }}
      />
    </ListItem>
  );
};
