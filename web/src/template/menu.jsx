import React from 'react'
import List from '@material-ui/core/List';
import ItemMenu from './ItemMenu'

import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import ArticleIcon from '@material-ui/icons/Description';
import VideoIcon from '@material-ui/icons/PlayArrow'
import PodcastIcon from '@material-ui/icons/Mic';
import GroupIcon from '@material-ui/icons/Group'
import EventIcon from '@material-ui/icons/Event'
import CampaignIcon from '@material-ui/icons/Share'

import { withRouter } from 'react-router'

function Menu(props) {

  const url = props.match.path

  return (
    <List>
      <ItemMenu selected={url == "/"} icon={(<HomeIcon />)} label="Home" link="/" />
      <ItemMenu selected={url.includes("/livros")} icon={(<BookIcon />)} label="Livros" link="/livros" />
      <ItemMenu selected={url.includes("/artigos")} icon={(<ArticleIcon />)} label="Artigos" link="/artigos" />
      <ItemMenu selected={url.includes("/videos")} icon={(<VideoIcon />)} label="Vídeos" link="/videos" />
      <ItemMenu selected={url.includes("/podcasts")} icon={(<PodcastIcon />)} label="Podcasts" link="/podcasts" />
      <ItemMenu selected={url.includes("/grupos")} icon={(<GroupIcon />)} label="Grupos" link="/grupos" />
      <ItemMenu selected={url.includes("/eventos")} icon={(<EventIcon />)} label="Eventos" link="/eventos" />
      <ItemMenu selected={url.includes("/campanhas")} icon={(<CampaignIcon />)} label="Campanhas" link="/campanhas" />
    </List>
  )
}

export default withRouter(Menu)