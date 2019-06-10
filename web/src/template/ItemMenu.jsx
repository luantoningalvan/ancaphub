import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

export default props => (
    <Link component={RouterLink} to={props.link} underline='none' color="textPrimary">
        <ListItem button>
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.label} />
        </ListItem>
    </Link>
)