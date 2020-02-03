import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Collapse,
  List,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons/ExpandMore';

export default props => {
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
        <ListItemIcon>
          <Icon>{props.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </div>
  );
};
