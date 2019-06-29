import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '../template/menuItem'
import MenuTree from '../template/menuTree'

// Icones
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import ArticleIcon from '@material-ui/icons/Description';
import PodcastIcon from '@material-ui/icons/Mic';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddIcon from '@material-ui/icons/Add';

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

    return (
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
                <MenuItem icon={(<HomeIcon />)} link="/" label="Dashboard" />
                <MenuTree icon={(<BookIcon />)} label="Livros">
                    <MenuItem icon={(<ViewListIcon />)} link="/books" label="Ver Todos" />
                    <MenuItem icon={(<AddIcon />)} link="/books/add" label="Adicionar Novo" />
                </MenuTree>

                <MenuTree icon={(<ArticleIcon />)} label="Artigos">
                    <MenuItem icon={(<ViewListIcon />)} link="/articles" label="Ver Todos" />
                    <MenuItem icon={(<AddIcon />)} link="/articles/add" label="Adicionar Novo" />
                </MenuTree>
            </List>
        </Drawer>
    )
}