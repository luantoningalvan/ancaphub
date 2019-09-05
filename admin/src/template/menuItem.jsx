import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  icon: {
    minWidth: '40px'
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
      <ListItem button selected={props.selected}>
        <ListItemIcon
          classes={{
            root: clsx(classes.icon)
          }}>
          {props.icon}
        </ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItem>
    </Link>
  );
};
