import React from 'react'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';

export default props => {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        }
    }))

    const classes = useStyles();
    const [open, setOpen] = React.useState(true)

    function handleClick() {
        setOpen(!open);
    }

    const children = React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, {
            nested: true
        })
    })

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
    )
}
