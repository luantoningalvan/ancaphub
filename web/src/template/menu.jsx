import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ItemMenu from './ItemMenu'

import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import ArticleIcon from '@material-ui/icons/Description';
import PodcastIcon from '@material-ui/icons/Mic';
import GroupIcon from '@material-ui/icons/Group'
import EventIcon from '@material-ui/icons/Event'
import CampaignIcon from '@material-ui/icons/Share'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}));


export default function Menu(props) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ItemMenu icon={(<HomeIcon />)} label="Home" link="/" />
        <ItemMenu icon={(<BookIcon />)} label="Livros" link="/livros" />
        <ItemMenu icon={(<ArticleIcon />)} label="Artigos" link="/artigos" />
        <ItemMenu icon={(<PodcastIcon />)} label="Podcasts" link="/podcasts" />
        <ItemMenu icon={(<GroupIcon />)} label="Grupos" link="/grupos" />
        <ItemMenu icon={(<EventIcon />)} label="Eventos" link="/eventos" />
        <ItemMenu icon={(<CampaignIcon />)} label="Campanhas" link="/campanhas" />
      </List>
    </Drawer>
  )
}
