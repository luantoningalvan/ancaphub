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
    minWidth: '40px',
    color: 'white'
  },
  item: { color: 'white'}
}));

export default props => {
  const classes = useStyles();
  return (
    <Link
      component={RouterLink}
      to={props.link}
      underline="none"
      styles={{root: classes.item}}>
      <ListItem button selected={props.selected}>
        <ListItemIcon
          classes={{
            root: clsx(classes.icon)
          }}>
          {props.icon}
        </ListItemIcon>
        <ListItemText primary={props.label} className={classes.item} />
      </ListItem>
    </Link>
  );
};
