import React from 'react';
import { List, Badge } from '@material-ui/core';
import MenuItem from './menuItem';
import MenuTree from './menuTree';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import CollectionIcon from '@material-ui/icons/FolderOutlined';
import BookIcon from '@material-ui/icons/BookOutlined';
import ArticleIcon from '@material-ui/icons/DescriptionOutlined';
import VideoIcon from '@material-ui/icons/PlayArrowOutlined';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import CampaignIcon from '@material-ui/icons/ShareOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

function Menu(props) {
  const url = props.match.path;
  const { isAuthenticated } = props

  return (
    <>
      <List>
        <MenuItem
          selected={url === '/'}
          icon={<HomeIcon />}
          label="Home"
          link="/"
        />
        {isAuthenticated && (
          <MenuItem
            selected={url.includes('/notifications')}
            icon={<Badge badgeContent={props.notReadCount} color="secondary"><NotificationsIcon /></Badge>}
            label="Notificações"
            link="/notifications"
          />
        )}

        <MenuTree icon={<CollectionIcon />} label="Coleção">
          <MenuItem
            selected={url.includes('/books')}
            icon={<BookIcon />}
            label="Livros"
            link="/books"
          />
          <MenuItem
            selected={url.includes('/articles')}
            icon={<ArticleIcon />}
            label="Artigos"
            link="/articles"
          />
          <MenuItem
            selected={url.includes('/videos')}
            icon={<VideoIcon />}
            label="Vídeos"
            link="/videos"
          />
        </MenuTree>

        {isAuthenticated && (
          <MenuItem
            selected={url.includes('/groups')}
            icon={<GroupIcon />}
            label="Grupos"
            link="/groups"
          />
        )}
        {isAuthenticated && (
          <MenuItem
            selected={url.includes('/events')}
            icon={<EventIcon />}
            label="Eventos"
            link="/events"
          />
        )}
        {isAuthenticated && (
          <MenuItem
            selected={url.includes('/projects')}
            icon={<CampaignIcon />}
            label="Projetos"
            link="/projects"
          />
        )}
      </List>
    </>
  );
}
const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated, notReadCount: state.notifications.notReadCount })
Menu = connect(mapStateToProps)(Menu)
export default withRouter(Menu);
