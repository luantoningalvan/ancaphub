import React from 'react'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

export default props => {
    const useStyles = makeStyles(theme => ({
        listItem: {
            textDecoration: 'none',
            color: '#333'
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }))
    const classes = useStyles()

    return(
        <Link to={props.link} className="waves-effect waves-blue" className={classes.listItem}>
            <ListItem button className={(props.nested) ? classes.nested : null}>
                <ListItemIcon>
                    <Icon>{props.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={props.label} />
            </ListItem>
        </Link>
    )
}
