import React from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';

// Icons
import NewsFeedIcon from 'react-ionicons/lib/IosPaper';
import LibraryIcon from 'react-ionicons/lib/IosFolderOpen';
import BookIcon from 'react-ionicons/lib/IosBook';
import VideoIcon from 'react-ionicons/lib/IosPlay';
import GroupIcon from 'react-ionicons/lib/IosPeople';
import EventIcon from 'react-ionicons/lib/IosCalendar';
import ProjectIcon from 'react-ionicons/lib/IosBrush';

// i18n
import { FormattedMessage } from 'react-intl';
import MenuTree from './MenuTree';
import MenuItem from './MenuItem';

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Menu = () => {
  const { url } = useRouteMatch();

  return (
    <MenuWrapper>
      <MenuItem
        current={url === '/'}
        icon={<NewsFeedIcon />}
        label={(
          <FormattedMessage
            id="common.home"
            description="Label do menu - Home"
          />
        )}
        link="/home"
      />

      <MenuTree
        current={url.includes('/books') || url.includes('/articles') || url.includes('/videos')}
        icon={<LibraryIcon />}
        label={(
          <FormattedMessage
            id="common.library"
            description="Label do menu - Biblioteca"
          />
        )}
      >
        <MenuItem
          current={url.includes('/books')}
          icon={<BookIcon />}
          label="Livros"
          link="/books"
        />
        <MenuItem
          current={url.includes('/articles')}
          icon={<NewsFeedIcon />}
          label="Artigos"
          link="/articles"
        />
        <MenuItem
          current={url.includes('/videos')}
          icon={<VideoIcon />}
          label="Vídeos"
          link="/videos"
        />
      </MenuTree>

      <MenuItem
        current={url.includes('/groups')}
        icon={<GroupIcon />}
        label={(
          <FormattedMessage
            id="common.groups"
            description="Label do menu - Grupos"
          />
        )}
        link="/groups"
      />

      <MenuItem
        current={url.includes('/events')}
        icon={<EventIcon />}
        label={(
          <FormattedMessage
            id="common.events"
            description="Label do menu - Eventos"
          />
        )}
        link="/events"
      />

      <MenuItem
        current={url.includes('/projects')}
        icon={<ProjectIcon />}
        label={(
          <FormattedMessage
            id="common.projects"
            description="Label do menu - Projetos"
          />
        )}
        link="/projects"
      />
    </MenuWrapper>
  );
};

export default Menu;
