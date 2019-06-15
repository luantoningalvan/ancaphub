import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '../template/menuItem'
import MenuTree from '../template/menuTree'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}));

export default props => {
    const classes = useStyles();
    
    return(
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <MenuItem icon="dashboard" link="/" label="Dashboard"/>
                <MenuTree icon="library_books" label="Livros">
                    <MenuItem icon="view_list" link="/books" label="Ver Todos"/>
                    <MenuItem icon="add" link="/books/add" label="Adicionar Novo"/>
                </MenuTree>
            </List>
        </Drawer>
    )
}