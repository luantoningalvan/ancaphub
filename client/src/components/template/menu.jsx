import React from 'react';
import { List, Badge } from '@material-ui/core';
import MenuItem from './menuItem';
import MenuTree from './menuTree';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import CollectionIcon from '@material-ui/icons/FolderOutlined';
import BookIcon from '@material-ui/icons/BookOutlined';
import ArticleIcon from '@material-ui/icons/DescriptionOutlined';
import VideoIcon from '@material-ui/icons/PlayArrowOutlined';
import PodcastIcon from '@material-ui/icons/MicNone';
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
            selected={url.includes('/notificacoes')}
            icon={<Badge badgeContent={props.notReadCount} color="secondary"><NotificationsIcon /></Badge>}
            label="Notificações"
            link="/notificacoes"
          />
        )}

        <MenuTree icon={<CollectionIcon />} label="Coleção">
          <MenuItem
            selected={url.includes('/livros')}
            icon={<BookIcon />}
            label="Livros"
            link="/livros"
          />
          <MenuItem
            selected={url.includes('/artigos')}
            icon={<ArticleIcon />}
            label="Artigos"
            link="/artigos"
          />
          <MenuItem
            selected={url.includes('/videos')}
            icon={<VideoIcon />}
            label="Vídeos"
            link="/videos"
          />
          <MenuItem
            selected={url.includes('/podcasts')}
            icon={<PodcastIcon />}
            label="Podcasts"
            link="/podcasts"
          />
        </MenuTree>

        {isAuthenticated && (
          <MenuItem
            selected={url.includes('/grupos')}
            icon={<GroupIcon />}
            label="Grupos"
            link="/grupos"
          />
        )}
        {isAuthenticated && (
          <MenuItem
            selected={url.includes('/eventos')}
            icon={<EventIcon />}
            label="Eventos"
            link="/eventos"
          />
        )}
        {isAuthenticated && (
          <MenuItem
            selected={url.includes('/campanhas')}
            icon={<CampaignIcon />}
            label="Campanhas"
            link="/campanhas"
          />
        )}
      </List>
    </>
  );
}
const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated, notReadCount: state.notifications.notReadCount })
Menu = connect(mapStateToProps)(Menu)
export default withRouter(Menu);
