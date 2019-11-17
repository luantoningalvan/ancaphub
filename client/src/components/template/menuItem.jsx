import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  icon: {
    minWidth: '40px'
  },
  selected: {
    color: theme.palette.secondary.main
  },
  notSelected: {
    color: '#757575'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <Link
      component={RouterLink}
      to={props.link}
      underline="none"
      color="textPrimary">
      <ListItem button className={props.nested ? classes.nested : null}>
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
            root: clsx({
              [classes.selected]: props.selected,
              [classes.notSelected]: !props.selected
            })
          }}
        />
      </ListItem>
    </Link>
  );
};
