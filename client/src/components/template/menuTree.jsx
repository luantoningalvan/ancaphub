import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';

export default props => {
  const useStyles = makeStyles(theme => ({
    icon: {
      minWidth: '40px'
    },
    selected: {
      color: theme.palette.secondary.main
    },
    notSelected: {
      color: theme.palette.text.primary
    }
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      nested: true
    });
  });

  return (
    <div>
      <ListItem button onClick={handleClick}>
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
        {open ? (
          <ExpandLess
            className={clsx(classes.icon, {
              [classes.selected]: props.selected,
              [classes.notSelected]: !props.selected
            })}
          />
        ) : (
            <ExpandMore
              className={clsx(classes.icon, {
                [classes.selected]: props.selected,
                [classes.notSelected]: !props.selected
              })}
            />
          )}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </div>
  );
};
